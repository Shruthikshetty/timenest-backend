/**
 * @file contains all the controllers related to follower
 */
import { Response } from 'express';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import Follower from '../models/follower';

/**
 * This controller is used to retrieve all the users that a user is following
 */
export const getFollowers = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    //get the user id from the validated user
    const { _id } = req.user!;

    //find all the users that the user is following
    const followers = await Follower.find({ user: _id }).populate('following');

    // incase no followers found
    if (followers.length === 0) {
      handleError(res, { statusCode: 404, message: 'No followers found' });
      return;
    }
    // send response with the followers
    res.status(200).json({ success: true, data: followers });
  } catch (err) {
    //cath any errors
    handleError(res, { error: err });
    return;
  }
};
