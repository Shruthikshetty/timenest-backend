/**
 * This is a express validation schema for adding a new follower
 */

import { Types } from "mongoose";

// type
export type AddFollowerReq = {
  following: Types.ObjectId;
};

// schema
export const AddFollowerValidationSchema = {
  following: {
    notEmpty: {
      errorMessage: 'Following user ref id is required',
    },
    isMongoId: {
      errorMessage: 'Following user ref id is  invalid',
    },
  },
};
