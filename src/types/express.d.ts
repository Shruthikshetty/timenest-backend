// type extension for express request
import { MatchedData } from 'express-validator';
import { IUser } from '../models/user.model';

/**
 * Extending express types
 */
declare global {
  namespace Express {
    interface Request {
      validatedData: MatchedData;
      user: IUser;
    }
  }
}
