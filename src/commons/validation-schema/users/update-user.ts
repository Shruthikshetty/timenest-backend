/**
 * This file contains the validation schema for updating the user details
 */
import { Schema } from 'express-validator';
import { Patterns } from '../../constants/patterns';

// Type definition for the validated data
export type UpdateUserReq = {
  name?: string;
  email?: string;
  password?: string;
  task?: number;
  ratings?: number;
  designation?: string;
  mentor?: boolean;
};

// schema
export const UpdateUserValidationSchema: Schema = {
  name: {
    optional: true,
    isString: {
      errorMessage: 'Name must be a string',
    },
    trim: true,
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Name must be between 2 and 50 characters',
    },
  },
  email: {
    optional: true,
    isString: {
      errorMessage: 'Email must be a string',
    },
    trim: true,
    toLowerCase: true,
    isLength: {
      options: { max: 100 },
      errorMessage: 'Email must be at most 100 characters',
    },
    matches: {
      options: [Patterns.email],
      errorMessage: 'Please provide a valid email address',
    },
  },
  password: {
    optional: true,
    isString: {
      errorMessage: 'Password must be a string',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters',
    },
  },
  task: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Task count cannot be negative',
    },
    toInt: true,
  },
  ratings: {
    optional: true,
    isFloat: {
      options: { min: 0, max: 5 },
      errorMessage: 'Ratings must be between 0 and 5',
    },
    toFloat: true,
  },
  mentor: {
    optional: true,
    isBoolean: {
      errorMessage: 'Mentor must be a boolean',
    },
  },
  designation: {
    optional: true,
    isString: {
      errorMessage: 'Designation must be a string',
    },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: 'Designation must be at most 50 characters',
    },
  },
};
