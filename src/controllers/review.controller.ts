/**
 * This @file contains all the controllers related to review
 */

import { Response, Request } from 'express';
import { handleError } from '../commons/utils/handleError';
import Review from '../models/review';
import { ValidatedRequest } from '../types/custom-types';
import { AddReviewReq } from '../commons/validation-schema/review/add-review';
import { Types } from 'mongoose';
import { DeleteReviewReq } from '../commons/validation-schema/review/delete-review';

/**
 * This is a controller used to add a new review
 */
export const addReview = async (
  req: ValidatedRequest<AddReviewReq>,
  res: Response
) => {
  try {
    // get the validated request body
    const requestData = req.validatedData!;

    //get the validated user
    const user = req.user!;

    // create a new review
    const newReview = new Review({
      ...requestData,
      reviewerId: user._id,
    });

    //save the new review
    const savedReview = await newReview.save();

    // send response with the saved review
    res.status(201).json({
      success: true,
      data: savedReview,
      message: 'Review added successfully',
    });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};

/**
 * This controller is used to get all the by the user
 */
export const geUserReviews = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    // get the validated user
    const user = req.user!;

    // get the reviews for the user
    const reviews = await Review.find({ reviewerId: user._id });

    // send response with the reviews
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};

/**
 * This controller is used to get the reviews for a user
 */
export const getReviewForUser = async (req: Request, res: Response) => {
  try {
    // get the user id from params
    const revieweeId = req.params?.revieweeId;

    // validate if the revieweeId is a valid mongo id
    if (!revieweeId || !Types.ObjectId.isValid(revieweeId)) {
      handleError(res, {
        statusCode: 400,
        message: 'Reviewee id is empty or invalid',
      });
      return;
    }
    // find the reviews  by reviewee id
    const reviews = await Review.find({ revieweeId: revieweeId });

    //send response with the reviews
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    //handle unexpected error
    handleError(res, { error: err });
  }
};

/**
 * This controller is used to delete a review
 */

export const deleteReview = async (
  req: ValidatedRequest<DeleteReviewReq>,
  res: Response
) => {
  try {
    // get the review id from validated request body
    const { reviewId } = req.validatedData!;

    // delete the review
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    // check if the review was deleted
    if (!deletedReview) {
      handleError(res, {
        statusCode: 404,
        message: 'Review not found',
      });
      return;
    }
    
    // send response with the deleted review
    res.status(200).json({
      success: true,
      data: deletedReview,
      message: 'Review deleted successfully',
    });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};
