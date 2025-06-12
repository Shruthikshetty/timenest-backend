/**
 * this
 */

import { Schema } from 'express-validator';
import { MessageTypes } from '../../constants/model.constants';

//type
export type SendMessageReq = {
  receiver: string;
  type?: 'text' | 'image';
  content: string;
};

/**
 * schema used to validate the request body when sending a message
 */
export const AddMessageValidationSchema: Schema = {
  receiver: {
    notEmpty: {
      errorMessage: 'Receiver ref id is required',
    },
    isMongoId: {
      errorMessage: 'Receiver ref id is  invalid',
    },
  },
  type: {
    optional: true,
    isIn: {
      options: MessageTypes,
      errorMessage: `value can only be ${MessageTypes.join(' | ')}`,
    },
  },
  content: {
    notEmpty: {
      errorMessage: 'Content is required',
    },
    isString: {
      errorMessage: 'Content should be string',
    },
  },
  read: {
    optional: true,
    isBoolean: {
      errorMessage: 'read should be boolean',
    },
  },
};
