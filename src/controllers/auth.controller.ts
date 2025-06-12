/**
 * @file holds all the user auth related controllers
 */
import bcrypt from 'bcrypt';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import { AuthenticateUserReq } from '../commons/validation-schema/auth/validate-user';
import User from '../models/user.model';
import { Response } from 'express';
import { generateTokens, verifyRefreshToken } from '../commons/utils/jwt';
import { devLogger } from '../commons/utils/logger';
import { setAccessTokenCookies } from '../commons/utils/setAccessTokenCookies';
import { Request } from 'express';

/**
 * Controller to authenticate a user and return a JWT token.
 */
export const authenticateUser = async (
  req: ValidatedRequest<AuthenticateUserReq>,
  res: Response
) => {
  const { email, password } = req.validatedData!;

  try {
    // Find user by email
    const user = await User.findOne({ email }).lean();
    if (!user) {
      handleError(res, {
        message: 'Invalid email',
        statusCode: 401,
      });
      return;
    }

    // Compare password with hashed password stored
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
      return;
    }

    // Generate JWT token using the util
    const { accessToken, refreshToken } = generateTokens({
      email,
      userId: user._id as string,
    });

    // Log the new access token in dev mode (for debugging)
    devLogger(
      `access token :- ${accessToken} \n refetch token :- ${refreshToken}`
    );

    // set client cookies
    setAccessTokenCookies(res, accessToken, refreshToken);

    // Respond with token and user data (without password)
    const { password: removedPass, ...userData } = user;
    void removedPass;

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      data: {
        user: userData,
        accessToken,
      },
    });
  } catch (err) {
    handleError(res, { error: err });
  }
};

/**
 * Controller to generate a new access token and refresh token
 * by verifying the refresh token stored in the HttpOnly cookie.
 */
export const refreshToken = (req: Request, res: Response) => {
  // Extract the refresh token from cookies
  const refreshToken = req.cookies.refreshToken;

  // Step 2: Handle case where token is missing
  if (!refreshToken) {
    return handleError(res, {
      message: 'Refresh token missing',
      statusCode: 401,
    });
  }

  try {
    // Verify the refresh token's validity and extract user payload
    const payload = verifyRefreshToken(refreshToken);

    // Generate a new access token and refresh token
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: payload.userId,
      email: payload.email,
    });

    // Log the new access token in dev mode (for debugging)
    devLogger(
      `access token :- ${accessToken} \n refetch token :- ${newRefreshToken}`
    );

    // Set the new access & refresh tokens in cookies
    setAccessTokenCookies(res, accessToken, newRefreshToken);

    // Return the access token in response body (optional)
    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken, // sent to client for use in Authorization header
      },
    });
  } catch (err) {
    // If token is invalid or expired, return a 401 error
    handleError(res, {
      message: 'Invalid or expired refresh token',
      statusCode: 401,
      error: err,
    });
  }
};

/**
 * Controller to log out a user by clearing authentication cookies.
 */
export const logout = (_req: Request, res: Response) => {
  res.clearCookie('accessToken', { httpOnly: false, sameSite: 'strict' });
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
