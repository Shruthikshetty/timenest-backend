/**
 * @file contains all the controllers related to user task
 */

import { handleError } from '../commons/utils/handleError';
import { Response } from 'express';
import { ValidatedRequest } from '../types/custom-types';
import { AddUserTaskReq } from '../commons/validation-schema/user-task/add-user-task';
import UserTask from '../models/userTask.model';
import { isDuplicateKeyError } from '../commons/utils/mongo-errors';

/**
 * controller to add a task to user tasks
 */
export const addUserTask = async (
  req: ValidatedRequest<AddUserTaskReq>,
  res: Response
) => {
  try {
    // create anew task from the validated request
    const newUserTask = new UserTask({
      userId: req.user!._id, // get the validated user
      ...req.validatedData!,
    });

    // save the new task
    const savedUserTask = await newUserTask.save();

    // send response with the saved task
    res.status(201).json({ success: true, data: savedUserTask });
  } catch (err) {
    //handle unexpected error
    const isDuplicate = isDuplicateKeyError(err);

    handleError(res, {
      error: err,
      message: isDuplicate ? 'Task already exists' : undefined,
      statusCode: isDuplicate ? 409 : 500,
    });
  }
};

/**
 * controller to get all the user task
 */
export const getUserTasks = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    // get the user tasks by the user id
    const userTasks = await UserTask.find({ userId: req.user!._id });

    // in no task found
    if (!userTasks || userTasks.length === 0) {
      handleError(res, { statusCode: 404, message: 'No user tasks found' });
      return;
    }
    // send response with the user tasks
    res.status(200).json({ success: true, data: userTasks });
  } catch (err) {
    //handle unexpected error
    handleError(res, { error: err });
  }
};
