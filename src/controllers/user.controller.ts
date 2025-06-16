/**
 * @file contains all the controllers related to user
 */

import { Request, Response } from 'express';
import User from '../models/user.model';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import { AddUserReq } from '../commons/validation-schema/users/add-user';
import { UpdateUserReq } from '../commons/validation-schema/users/update-user';

/**
 *this controller is used to get all the users data
 */
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().lean().select('-password');
    if (users.length > 0) {
      res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      handleError(res, { statusCode: 404, message: 'No users found' });
    }
  } catch (err) {
    // catch any errors
    handleError(res, { error: err });
  }
};

/**
 * this controller is used to add a new user
 */
export const addUser = async (
  req: ValidatedRequest<AddUserReq>,
  res: Response
) => {
  // extract details from the validated data
  const {
    name,
    email,
    password,
    designation,
    task,
    ratings,
    mentor = false,
  } = req.validatedData!; // will not be null

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      return handleError(res, {
        statusCode: 409,
        message: 'User with this email or name already exists',
      });
    }

    const newUser = new User({
      name,
      email,
      password, // raw password, will be hashed by the pre-save hook
      designation,
      task,
      ratings,
      mentor,
    });

    await newUser.save();

    // remove password from response
    const { password: removedPass, ...restData } = newUser.toObject();
    void removedPass; // this is not used

    // send response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: restData,
    });
  } catch (err) {
    handleError(res, { error: err });
  }
};

/**
 * Fetch a single user by ID
 */
export const getSingleUser = async (
  req: ValidatedRequest<Request>,
  res: Response
) => {
  try {
    // get user id from the authorized user
    const { _id } = req.user!; // this will not be null only if user is found this middleware will be executed
    // Find user by ID and exclude password field
    const user = await User.findById(_id).select('-password');

    // this might not be required since only validated user can get in here still placed as a fail safe
    if (!user) {
      handleError(res, { statusCode: 404, message: 'User not found' });
      return;
    }
    // return response
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    handleError(res, { error: err });
  }
};

/**
 * Update user fields
 */
export const updateUser = async (
  req: ValidatedRequest<UpdateUserReq>,
  res: Response
) => {
  try {
    // Get user ID from the authenticated user
    const { _id } = req.user!; // Non-null assertion, as middleware ensures user exists

    // Extract validated data
    const updates = req.validatedData!; // Non-null, as validation middleware ensures this

    // If no fields provided, return error
    if (!updates || Object.keys(updates).length === 0) {
      return handleError(res, {
        statusCode: 400,
        message: 'At least one field must be provided for update',
      });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -role');

    // in case no user found
    if (!updatedUser) {
      return handleError(res, { statusCode: 404, message: 'User not found' });
    }

    // Return response
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    handleError(res, { error: err });
  }
};
