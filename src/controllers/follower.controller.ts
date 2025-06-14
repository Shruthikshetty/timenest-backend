/**
 * @file contains all the controllers related to follower
 */
import { Response } from 'express';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import Follower from '../models/follower';
import { AddFollowerReq } from '../commons/validation-schema/follower/add-follower';

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
    const followers = await Follower.find({ user: _id }).select('-__v');

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

/**
 * This is a controller top add a new follower (USER TO FOLLOW ANOTHER USER)
 */
export const addFollower = async (
  req: ValidatedRequest<AddFollowerReq>,
  res: Response
) => {
  try {
    // get the user id from the validated user
    const { _id } = req.user!;

    // extract following user id from the validated data
    const { following } = req.validatedData!;

    // check if the user is already following the user
    const existingFollower = await Follower.findOne({
      user: _id,
      following,
    });

    // if the user is already following the user
    if (existingFollower) {
      handleError(res, {
        statusCode: 409,
        message: 'You are already following this user',
      });
      return;
    }

    // create a new follower
    const newFollower = new Follower({ user: _id, following });

    // save the new follower
    const savedFollower = await newFollower.save();

    // send response with the saved follower
    res.status(200).json({ success: true, data: savedFollower });
  } catch (err) {
    // catch any errors
    handleError(res, { error: err });
    return;
  }
};
