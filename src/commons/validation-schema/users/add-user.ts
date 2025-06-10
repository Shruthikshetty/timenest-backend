/**
 * @file holds the add user schema and type
 */
import { Schema } from 'express-validator';
import { Patterns } from '../../constants/patterns';

// add user request body type
export interface AddUserReq {
  name: string;
  email: string;
  password: string;
  designation: string;
  task?: number; // optional, as it has a default in the DB
  ratings?: number; // optional, as it has a default in the DB
}

/***
 * This is the validation schema  used for add user endpoint
 */
export const AddUserValidationSchema: Schema = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    notEmpty: {
      errorMessage: 'Name is required',
    },
    isLength: {
      options: { min: 2, max: 50 },
      errorMessage: 'Name must be between 2 and 50 characters',
    },
    trim: true,
  },

  email: {
    isString: {
      errorMessage: 'Email must be a string',
    },
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Must be a valid email address',
    },
    isLength: {
      options: { max: 100 },
      errorMessage: 'Email must not exceed 100 characters',
    },
    matches: {
      options: [Patterns.email],
      errorMessage: 'Email format is invalid',
    },
    normalizeEmail: true,
    trim: true,
  },

  password: {
    isString: {
      errorMessage: 'Password must be a string',
    },
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },

  task: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: 'Task must be a non-negative integer',
    },
    toInt: true,
  },

  ratings: {
    optional: true,
    isFloat: {
      options: { min: 0, max: 5 },
      errorMessage: 'Ratings must be a number between 0 and 5',
    },
    toFloat: true,
  },

  designation: {
    isString: {
      errorMessage: 'Designation must be a string',
    },
    notEmpty: {
      errorMessage: 'Designation is required',
    },
    isLength: {
      options: { max: 50 },
      errorMessage: 'Designation must not exceed 50 characters',
    },
    trim: true,
  },
};
