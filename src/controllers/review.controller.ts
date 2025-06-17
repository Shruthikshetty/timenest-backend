/**
 * This @file contains all the controllers related to review
 */

import { Response, Request } from 'express';
import { handleError } from '../commons/utils/handleError';
import Review from '../models/review.model';
import { ValidatedRequest } from '../types/custom-types';
import { AddReviewReq } from '../commons/validation-schema/review/add-review';
import { Types } from 'mongoose';
import { DeleteReviewReq } from '../commons/validation-schema/review/delete-review';
import { getReviewsWithOptions } from '../commons/utils/getReviews';
import { UpdateReviewReq } from '../commons/validation-schema/review/update-review';
import { isDuplicateKeyError } from '../commons/utils/mongo-errors';

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
  } catch (err: unknown) {
    // handle unexpected error
    if (isDuplicateKeyError(err)) {
      // in case the error is a duplicate key error
      handleError(res, {
        error: err,
        message: 'Review already exists',
        statusCode: 409,
      });
      return;
    }
    handleError(res, { error: err });
    return;
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

    // get start and limit from query params
    const start =
      parseInt((req as unknown as Request).query?.start as string) || 0;
    const limit =
      parseInt((req as unknown as Request).query?.limit as string) || 100;
    // check if full details is required
    const fullDetails =
      (req as unknown as Request).query?.full_details === 'false';

    // get the reviews for the user
    const reviews = await getReviewsWithOptions(
      !fullDetails,
      user._id,
      'reviewer',
      start,
      limit
    );

    //incase no reviews found
    if (reviews.length === 0) {
      handleError(res, {
        statusCode: 404,
        message: 'No reviews found',
      });
      return;
    }

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
    const userId = req.params?.userId;

    // get start and limit from query params
    const start =
      parseInt((req as unknown as Request).query.start as string) || 0;
    const limit =
      parseInt((req as unknown as Request).query.limit as string) || 100;
    // check if full details is required
    const fullDetails =
      (req as unknown as Request).query.full_details === 'false';

    // validate if the revieweeId is a valid mongo id
    if (!userId || !Types.ObjectId.isValid(userId)) {
      handleError(res, {
        statusCode: 400,
        message: 'Reviewee id is empty or invalid',
      });
      return;
    }
    // find the reviews  by reviewee id
    const reviews = await getReviewsWithOptions(
      !fullDetails,
      userId as unknown as Types.ObjectId,
      'reviewee',
      start,
      limit
    );

    //incase no reviews found
    if (reviews.length === 0) {
      handleError(res, {
        statusCode: 404,
        message: 'No reviews found',
      });
      return;
    }

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

/**
 * controller to update a review
 */
export const updateReview = async (
  req: ValidatedRequest<UpdateReviewReq>,
  res: Response
) => {
  try {
    //  destructure the validated request body
    const { reviewId, message, rating } = req.validatedData!;

    // update the review
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      {
        ...(message !== undefined && { message }),
        ...(rating !== undefined && { rating }),
      },
      { new: true }
    );

    // check if the review was updated
    if (!updatedReview) {
      handleError(res, {
        statusCode: 404,
        message: 'Review not found',
      });
      return;
    }

    // send response with the updated review
    res.status(200).json({
      success: true,
      data: updatedReview,
      message: 'Review updated successfully',
    });
  } catch (err) {
    // handle unexpected error
    handleError(res, { error: err });
  }
};
