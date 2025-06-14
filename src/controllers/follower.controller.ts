/**
 * @file contains all the controllers related to follower
 */
import { Response } from 'express';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import Follower from '../models/follower';
import { AddFollowerReq } from '../commons/validation-schema/follower/add-follower';
import { getFollowersWithOptions } from '../commons/utils/getFollowers';
import User from '../models/user.model';
import { Types } from 'mongoose';

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

    // Check if populate is required
    const populate = req.query.full_details === 'false';

    //find all the users that the user is following
    const followers = await getFollowersWithOptions(_id as string, populate);

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

/*
 *controller to delete follower (UNFOLLOW A USER)
 */
export const deleteFollower = async (
  req: ValidatedRequest<AddFollowerReq>,
  res: Response
) => {
  try {
    //find the follower to be deleted
    const follower = await Follower.findOneAndDelete({
      user: req.user!._id,
      following: req.validatedData!.following,
    });

    //send response with the deleted follower
    res.status(200).json({ success: true, data: follower });
  } catch (err) {
    //catch any errors
    handleError(res, { error: err });
  }
};

/**
 * controller to Get follower details by follower id
 */
export const getFollowerDetail = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    // check and validate follower id
    const followerId = req.params?.followingId;

    // check if the follower id is provided and is valid mongo id
    if (!followerId || !Types.ObjectId.isValid(followerId)) {
      handleError(res, {
        statusCode: 400,
        message: 'Follower id is empty or invalid',
      });
      return;
    }

    // check if user is following this user
    const isFollowing = await Follower.findOne({
      user: req.user!._id,
      following: followerId,
    });

    // if user is not following this user
    if (!isFollowing) {
      handleError(res, {
        statusCode: 403,
        message: 'You are not following this user',
      });
      return;
    }

    //find the follower
    const follower = await User.findById(followerId)
      .select('-__v -password -role -createdAt -updatedAt')
      .lean()
      .exec();

    //incase no follower found
    if (!follower) {
      handleError(res, { statusCode: 404, message: 'Follower not found' });
      return;
    }

    //send response with the follower details
    res.status(200).json({ success: true, data: follower });
  } catch (err) {
    //catch any errors
    handleError(res, { error: err });
  }
};

/**
 * controller to get the count of followers and following users for a user
 */
export const followerCount = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    // get the user id from the validated user
    const { _id } = req.user!;

    // get the count of followers and following users for the user
    const followerCount = await Follower.countDocuments({ following: _id });
    const followingCount = await Follower.countDocuments({ user: _id });

    // send response with the count of followers and following users
    res.status(200).json({
      success: true,
      data: { followers: followerCount, following: followingCount },
    });
  } catch (err) {
    // catch any errors
    handleError(res, { error: err });
  }
};
