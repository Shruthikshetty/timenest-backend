/**
 * This @file contains all the routes related to review
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { checkSchema } from 'express-validator';
import { validate } from '../commons/middlewares/validationHandler';
import { addReview } from '../controllers/review.controller';
import { addReviewValidationSchema } from '../commons/validation-schema/review/add-review';

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

// export all user routes clubbed
export default router;
