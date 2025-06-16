/**
 * @file contains the controller for the mentors
 */

import { handleError } from '../commons/utils/handleError';
import { Response } from 'express';
import User from '../models/user.model';
import { ValidatedRequest } from '../types/custom-types';

/**
 * Controller to get all mentors
 */
export const getMentors = async (
  _: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    //get the mentors from Users model
    const mentors = await User.find({ mentor: true }).select("-password -__v -createdAt -updatedAt -role").lean().exec();

    // in case no mentors found
    if (!mentors || mentors.length === 0) {
      handleError(res, { statusCode: 404, message: 'No mentors found' });
      return;
    }

    // send response with the mentors
    res.status(200).json({ success: true, data: mentors });
  } catch (err) {
    //handle unexpected error
    handleError(res, { error: err });
  }
};
