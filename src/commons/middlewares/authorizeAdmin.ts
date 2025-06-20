import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import User from '../../models/user.model';
import { handleError } from '../utils/handleError';

/**
 * Only admin can access this route
 * @param req request object
 * @param res response object
 * @param next next function to call the next middleware
 * @returns  void attaches user details to request object if the user is an admin
 */
export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the access token from cookies
    const token = req.cookies?.accessToken;

    if (!token) {
      handleError(res, {
        statusCode: 401,
        message: 'No token provided',
      });
      return;
    }

    // If the token is not provided or is in an invalid format
    const payload = verifyAccessToken(token);

    // Fetch user from DB to check role
    const user = await User.findById(payload.userId);
    if (!user || user.role !== 'admin') {
      handleError(res, {
        statusCode: 40,
        message: 'Admin access required',
      });
      return;
    }

    //Attach user to request
    //@ts-ignore
    req.user = user;
    next();
  } catch (err) {
    handleError(res, {
      error: err,
      statusCode: 401,
      message: 'Admin access required | Invalid token',
    });
  }
};
