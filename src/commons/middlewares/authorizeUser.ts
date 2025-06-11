import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

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
    // Get the authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({
        message: 'Invalid token | No token provided',
        statusCode: 401,
      });
      return;
    }

    // Verify the token and extract user details
    const user = verifyAccessToken(token);

    if (!user) {
      res.status(401).json({
        message: 'User not authenticated | Invalid token',
        statusCode: 401,
      });
      return;
    }
    // Attach user details to the request object
    //@ts-ignore
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Handle error if user is not authenticated
    res.status(401).json({
      message: 'Authorization failed | Invalid token',
      statusCode: 401,
      error: error,
    });
    return;
  }
};
