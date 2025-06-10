/**
 * @file holds the authenticate user schema and type
 */

import { Schema } from 'express-validator';
import { Patterns } from '../../constants/patterns';

//type
export type AuthenticateUserReq = {
  email: string;
  password: string;
};

// schema
export const AuthenticateUserValidationSchema: Schema = {
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
};
