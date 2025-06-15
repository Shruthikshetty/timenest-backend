/**
 * @file the type and schema for the delete  review request body
 */

import { Schema } from 'express-validator';

// type
export type DeleteReviewReq = {
  reviewId: string;
};

// schema
export const deleteReviewValidationSchema: Schema = {
  reviewId: {
    notEmpty: {
      errorMessage: 'Review ref id is required',
    },
    isMongoId: {
      errorMessage: 'Review ref id is  invalid',
    },
  },
};
