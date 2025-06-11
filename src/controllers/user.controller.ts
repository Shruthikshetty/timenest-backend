/**
 * @file contains all the controllers related to user
 */

import { Request, Response } from 'express';
import User from '../models/user.model';
import { handleError } from '../commons/utils/handleError';
import { ValidatedRequest } from '../types/custom-types';
import { AddUserReq } from '../commons/validation-schema/users/add-user';
import mongoose from 'mongoose';

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
  const { name, email, password, designation, task, ratings } =
    req.validatedData!; // will not be null

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
export const getUserById = async (req: Request, res: Response) => {
  try {
    // Extract user ID from request parameters
    const { id } = req.params;
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      handleError(res, { statusCode: 400, message: 'Invalid user ID' });
    }
    // Find user by ID and exclude password field
    const user = await User.findById(id).select('-password');
    if (!user) {
      handleError(res, { statusCode: 404, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    handleError(res, { error: err });
  }
};
