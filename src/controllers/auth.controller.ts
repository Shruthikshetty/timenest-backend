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
import { RefetchTokenReq } from '../commons/validation-schema/auth/refetch-token';

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

    // Respond with token and user data (without password)
    const { password: removedPass, ...userData } = user;
    void removedPass;

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      data: {
        user: userData,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    handleError(res, { error: err });
  }
};

/**
 * This is used top generate a new jwt token by taken the refetch token
 */
export const refreshToken = (
  req: ValidatedRequest<RefetchTokenReq>,
  res: Response
) => {
  // extract the refetch token from the validated request
  const { refreshToken } = req.validatedData!;

  try {
    // get the details from the refetch token
    const payload = verifyRefreshToken(refreshToken);

    // if the token is valid, generate a new access token and refresh token
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: payload.userId,
      email: payload.email,
    });

    // send the new tokens in the response
    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (err) {
    handleError(res, {
      message: 'Invalid or expired refresh token',
      statusCode: 401,
      error: err,
    });
  }
};
