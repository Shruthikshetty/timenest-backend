/**
 * @file the type and schema for the update review request body
 */
//@TODO check rating validation might be wrong
import { Schema } from 'express-validator';
import { Types } from 'mongoose';

// type
export type UpdateReviewReq = {
  reviewId: Types.ObjectId;
  message: string;
  rating: number;
};

// schema
export const updateReviewValidationSchema: Schema = {
  reviewId: {
    notEmpty: {
      errorMessage: 'Review ref id is required',
    },
    isMongoId: {
      errorMessage: 'Review ref id is  invalid',
    },
  },
  message: {
    optional: true,
    isString: {
      errorMessage: 'Message should be string',
    },
  },
  rating: {
    optional: true,
    isInt: {
      options: { min: 0, max: 5 },
      errorMessage:
        'Not a Integer | Rating should be an integer between 0 and 5',
    },
  },
  _: {
    custom: {
      /**
       * Checks if at least one of message or rating is provided in the body of the request.
       * If not, the validation fails.
       */
      options: (_, { req }) => {
        if (!req.body.message && !req.body.rating) return false;
        return true;
      },
      errorMessage: 'Message or rating is required',
    },
  },
};
