/**
 * This @file contains all the routes related to review
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { checkSchema } from 'express-validator';
import { validate } from '../commons/middlewares/validationHandler';
import {
  addReview,
  deleteReview,
  geUserReviews,
  getReviewForUser,
  updateReview,
} from '../controllers/review.controller';
import { addReviewValidationSchema } from '../commons/validation-schema/review/add-review';
import { deleteReviewValidationSchema } from '../commons/validation-schema/review/delete-review';
import { updateReviewValidationSchema } from '../commons/validation-schema/review/update-review';

//initialize Router
const router = Router();

// Route to add a review
router.post(
  '/',
  requireUser,
  checkSchema(addReviewValidationSchema),
  validate,
  addReview
);

// Route to delete a review
router.delete(
  '/',
  requireUser,
  checkSchema(deleteReviewValidationSchema),
  validate,
  deleteReview
);

// Route to get all reviews by  user
router.get('/by', requireUser, geUserReviews);

// Route to get all reviews for a  user
router.get('/for/:userId', requireUser, getReviewForUser);

// update a review
router.patch(
  '/',
  requireUser,
  checkSchema(updateReviewValidationSchema),
  validate,
  updateReview
);

// export all user routes clubbed
export default router;
