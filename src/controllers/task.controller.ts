/**
 * This @file contains all the controllers related to task
 */

import { handleError } from '../commons/utils/handleError';
import { Request, Response } from 'express';
import Task from '../models/task.model';

/**
 * controller to get task's
 */
export const getTasks = async (_: Request, res: Response) => {
  try {
    // get all tasks
    const tasks = await Task.find().lean().exec();
    // if no task found
    if (!tasks || tasks.length === 0) {
      handleError(res, { statusCode: 404, message: 'No tasks found' });
      return;
    }
    // send response with tasks
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    // catch any errors
    handleError(res, { error: err });
  }
};


