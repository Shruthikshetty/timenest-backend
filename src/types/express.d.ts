// type extension for express request
import { MatchedData } from 'express-validator';

/**
 * Extending express types
 */
declare global {
  namespace Express {
    interface Request {
      validatedData: MatchedData;
    }
  }
}
