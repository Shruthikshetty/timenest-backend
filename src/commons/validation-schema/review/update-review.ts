/**
 * @file the type and schema for the update review request body
 */

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
    isLength: {
      options: { min: 1, max: 5 },
      errorMessage: 'Rating should be between 1 and 5',
    },
    isNumeric: {
      errorMessage: 'Rating should be a number',
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
