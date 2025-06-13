import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import User from '../../models/user.model';
import { handleError } from '../utils/handleError';

/**
 * Middleware to verify if a user is authenticated.
 * Checks for a valid JWT token in the Authorization header and attaches user details to the request object.
 *
 * @param req Request object
 * @param res Response object
 * @param next Next function to call the next middleware
 * @returns Void, attaches user details to request object if the user is authenticated
 */
export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the access token from cookies
    const token = req.cookies?.accessToken;
    if (!token) {
      handleError(res, {
        statusCode: 401,
        message: 'Invalid token | No token provided',
      });
      return;
    }

    // Verify the token
    const payload = verifyAccessToken(token);

    // Fetch user from DB
    const user = await User.findById(payload.userId);
    if (!user) {
      handleError(res, {
        statusCode: 401,
        message: 'User not found',
      });
      return;
    }
    // Attach user details to the request object
    //@ts-ignore
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Handle error if user is not authenticated
    handleError(res, {
      message: 'Authorization failed | Invalid token',
      statusCode: 401,
      error: error,
    });
    return;
  }
};
