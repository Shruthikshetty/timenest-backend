/**
 * This @file contains the validation schema and the type for add task request body
 */

import { Types } from 'mongoose';

//type ...
export type DeleteTaskReq = {
  taskId: Types.ObjectId;
};

//Schema
export const DeleteTaskValidationSchema = {
  taskId: {
    notEmpty: {
      errorMessage: 'Task ref id is required',
    },
    isMongoId: {
      errorMessage: 'Task ref id is  invalid',
    },
  },
};
