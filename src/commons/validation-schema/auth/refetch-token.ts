/**
 * @file contains the type and schema for refetch token endpoint
 */

import { Schema } from 'express-validator';

//type


//Schema 
export const refetchTokenValidationSchema: Schema = {
  refreshToken: {
    isEmpty: {
      errorMessage: 'Refetch token can not be empty',
    },
    isString: {
      errorMessage: 'Refetch token should be string',
    },
  },
};
