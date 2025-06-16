/**
 * This @file contains all the controllers related to task
 */

import { handleError } from '../commons/utils/handleError';
import { Request, Response } from 'express';
import Task from '../models/task.model';
import { ValidatedRequest } from '../types/custom-types';
import { AddTaskReq } from '../commons/validation-schema/task/add-task';

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

/**
 * controller to add task
 */
export const addTask = async (
  req: ValidatedRequest<AddTaskReq>,
  res: Response
) => {
  try {
    // get the validated req body
    const {
      category,
      description,
      displayMedia = '',
      displayMediaType = 'image',
      title,
      timeToComplete,
    } = req.validatedData!;

    // create a new task
    const task = new Task({
      category,
      createdBy: req.user!._id, // assign the user id
      description,
      displayMedia,
      displayMediaType,
      title,
      timeToComplete,
    });

    // save the task
    await task.save();

    // send response with task
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    // catch any errors
    handleError(res, { error: err });
  }
};
