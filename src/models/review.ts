/**
 * This @file contains the review model
 */
import mongoose from 'mongoose';

// Define the Review interface
export interface IReview {
  reviewerId: mongoose.Types.ObjectId;
  revieweeId: mongoose.Types.ObjectId;
  message: string;
  rating: number;
}

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    revieweeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
    unique: {
      fields: ['reviewerId', 'revieweeId'], //one user can only review another user once
      options: {
        message: 'A Review already exists between these two users',
      },
    },
  }
);

// create a model from the schema
const Review = mongoose.model('Review', reviewSchema);

// export the review model
export default Review;
