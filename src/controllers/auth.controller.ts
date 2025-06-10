/**
 * @file holds all the user auth related controllers
 */
import bcrypt from 'bcrypt';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import { AuthenticateUserReq } from '../commons/validation-schema/auth/validate-user';
import User from '../models/user.model';
import { Response } from 'express';
import { generateTokens } from '../commons/utils/jwt';

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



// export const refreshToken = (req: Request, res: Response) => {
//   const refreshToken = req.body.refreshToken;

//   if (!refreshToken) {
//     return res.status(400).json({ message: 'Refresh token missing' });
//   }

//   try {
//     const payload = verifyRefreshToken(refreshToken);

//     const { accessToken, refreshToken: newRefreshToken } = generateTokens({
//       userId: payload.userId,
//       email: payload.email,
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Token refreshed successfully',
//       data: {
//         accessToken,
//         refreshToken: newRefreshToken,
//       },
//     });
//   } catch (err) {
//     handleError(res, {
//       message: 'Invalid or expired refresh token',
//       statusCode: 401,
//     });
//   }
// };