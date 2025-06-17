/**
 * @file contains all the type and validation schema for add user task request body
 */

import { Schema } from 'express-validator';
import { TaskProgressTypes } from '../../constants/model.constants';

//type
export type AddUserTaskReq = {
  taskId: string;
  progress?: number;
  rating?: number;
  status?: 'planned' | 'in-progress' | 'complete' | 'quit';
};

// schema
export const AddUserTaskValidationSchema: Schema = {
  taskId: {
    notEmpty: {
      errorMessage: 'Task ref id is required',
    },
    isMongoId: {
      errorMessage: 'Task ref id is  invalid',
    },
  },
  progress: {
    optional: true,
    isNumeric: {
      errorMessage: 'Progress should be a number',
    },
    isInt: {
      options: { min: 0, max: 100 },
      errorMessage: 'Progress should be an integer between 0 and 100',
    },
  },
  rating: {
    optional: true,
    isInt: {
      options: { min: 0, max: 5 },
      errorMessage: 'Rating should be an integer between 0 and 5',
    },
  },
  status: {
    optional: true,
    isIn: {
      options: TaskProgressTypes,
      errorMessage: `value can only be ${TaskProgressTypes.join(' | ')}`,
    },
  },
};
