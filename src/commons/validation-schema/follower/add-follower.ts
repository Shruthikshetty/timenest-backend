/**
 * This is a express validation schema for adding a new follower
 */

// type
export type AddFollowerReq = {
  following: string;
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
