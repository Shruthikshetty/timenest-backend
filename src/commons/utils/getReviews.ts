import { Types } from 'mongoose';
import Review from '../../models/review.model';

/**
 * @function getReviewsWithOptions
 * @description This function will return all reviews related to a particular user.
 * @param {boolean} [fullDetails=true] - If true, then reviewer/reviewee's details will be populated.
 * @param {Types.ObjectId} id - The id of the user.
 * @param {'reviewer'|'reviewee'} type - The type of user.
 * @param {number} [start=0] - The start index of the query.
 * @param {number} [limit=100] - The limit of the query.
 * @returns {Promise<IReview[]>} - The array of reviews.
 */
export const getReviewsWithOptions = (
  fullDetails = true,
  id: Types.ObjectId,
  type: 'reviewee' | 'reviewer',
  start = 0,
  limit = 100
) => {
  // handle invalid inputs for start and limit , check is number
  if (isNaN(start) || start < 0) {
    start = 0;
  }
  if (isNaN(limit) || limit < 0) {
    limit = 100;
  }
  // return the reviews based on the type
  switch (type) {
    case 'reviewer':
      return fullDetails
        ? Review.find({ reviewerId: id })
            .skip(start)
            .limit(limit)
            .populate(
              'revieweeId',
              '-password -role -__v -createdAt -updatedAt'
            )
            .lean()
            .exec()
        : Review.find({ reviewerId: id })
            .skip(start)
            .limit(limit)
            .lean()
            .exec();
    case 'reviewee':
      return fullDetails
        ? Review.find({ revieweeId: id })
            .skip(start)
            .limit(limit)
            .populate(
              'reviewerId',
              '-password -role -__v -createdAt -updatedAt'
            )
            .lean()
            .exec()
        : Review.find({ revieweeId: id })
            .skip(start)
            .limit(limit)
            .lean()
            .exec();
  }
};
