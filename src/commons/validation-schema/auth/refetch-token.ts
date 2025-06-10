/**
 * @file contains the type and schema for refetch token endpoint
 */

import { Schema } from 'express-validator';

//type
export type RefetchTokenReq = {
  refreshToken: string;
};

//Schema
export const RefetchTokenValidationSchema: Schema = {
  refreshToken: {
    notEmpty: {
      errorMessage: 'Refetch token can not be empty',
    },
    isString: {
      errorMessage: 'Refetch token should be string',
    },
  },
};
