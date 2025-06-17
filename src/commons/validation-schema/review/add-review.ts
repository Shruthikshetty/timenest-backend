/**
 * @file the type and schema for the add review request body
 */
import { Schema } from 'express-validator';

// type
export type AddReviewReq = {
  revieweeId: string;
  message: string;
  rating: number;
};

// schema
export const addReviewValidationSchema: Schema = {
  revieweeId: {
    notEmpty: {
      errorMessage: 'Reviewee ref id is required',
    },
    isMongoId: {
      errorMessage: 'Reviewee ref id is  invalid',
    },
  },
  message: {
    optional: true,
    isString: {
      errorMessage: 'Message should be string',
    },
  },
  rating: {
    notEmpty: {
      errorMessage: 'Rating is required   ',
    },
    isInt: {
      options: { min: 0, max: 5 },
      errorMessage: 'Rating should be an integer between 0 and 5',
    },
    isNumeric: {
      errorMessage: 'Rating should be a number',
    },
  },
};
