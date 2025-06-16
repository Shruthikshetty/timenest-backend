/**
 * @file contains the type and the validation schema from add task request body
 */

import { Schema } from 'express-validator';

//type...
export type AddTaskReq = {
  title: string;
  description: string;
  category: string;
  timeToComplete: number;
  displayMedia: string;
  displayMediaType: 'image' | 'video';
};

//schema...
export const addTaskValidationSchema: Schema = {
  title: {
    notEmpty: {
      errorMessage: 'Title is required',
    },
    isString: {
      errorMessage: 'Title should be string',
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Description is required',
    },
    isString: {
      errorMessage: 'Description should be string',
    },
  },
  category: {
    notEmpty: {
      errorMessage: 'Category is required',
    },
    isString: {
      errorMessage: 'Category should be string',
    },
  },
  timeToComplete: {
    notEmpty: {
      errorMessage: 'Time to complete is required',
    },
    isNumeric: {
      errorMessage: 'Time to complete should be a number its in minutes',
    },
  },
  displayMedia: {
    optional: true,
    isString: {
      errorMessage: 'Display media should be string',
    },
  },
  displayMediaType: {
    optional: true,
    isIn: {
      options: ['image', 'video'],
      errorMessage: 'Display media type can only be image or video',
    },
  },
};
