/**
 * @file contains the controller for the mentors
 */

import { handleError } from '../commons/utils/handleError';
import { Response, Request } from 'express';
import User from '../models/user.model';
import { ValidatedRequest } from '../types/custom-types';
import { Types } from 'mongoose';

/**
 * Controller to get all mentors
 */
export const getMentors = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    //get the start and limit query params
    const query = (req as unknown as Request).query;

    const start = Math.max(0, parseInt(query.start as string, 10) || 0);

    const limit = Math.max(1, parseInt(query.limit as string, 10) || 100);

    //get the mentors from Users model
    const mentors = await User.find({ mentor: true })
      .select('-password -__v -createdAt -updatedAt -role')
      .skip(start)
      .limit(limit)
      .lean()
      .exec();

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

/**
 * Controller to get a mentor by id (this is nothing but user id)
 * this will only return the user details if he is a mentor
 */
export const getMentorById = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    // get the mentor id from params
    const { mentorId } = (req as unknown as Request).params;

    // validate if the mentor id is a valid mongo id
    if (!mentorId || !Types.ObjectId.isValid(mentorId)) {
      handleError(res, {
        statusCode: 400,
        message: 'Mentor id is empty or invalid',
      });
      return;
    }

    // check if the user is a mentor
    const user = await User.findById(mentorId)
      .select('-password -__v -createdAt -updatedAt -role')
      .lean()
      .exec();

    if (!user) {
      handleError(res, {
        statusCode: 404,
        message: 'User not found',
      });
      return;
    } else if (!user.mentor) {
      handleError(res, {
        statusCode: 403,
        message: 'User is not a mentor',
      });
      return;
    }

    // send response with the mentor
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};

/**
 * Controller to get count of total mentors
 */

export const getMentorCount = async (_: Request, res: Response) => {
  try {
    // get the count of mentors from Users model
    const count = await User.countDocuments({ mentor: true }).exec();

    // send response with the count of mentors
    res.status(200).json({
      success: true,
      data: {
        count: count,
      },
    });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};

//@TODO recent mentor to be implemented
// const recentMentorSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
//   viewedAt: { type: Date, default: Date.now }
// });
