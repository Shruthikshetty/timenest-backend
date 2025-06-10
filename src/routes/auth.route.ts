/**
 * @file contains all the user auth routes
 */

import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { AuthenticateUserValidationSchema } from '../commons/validation-schema/auth/validate-user';
import { validate } from '../commons/middlewares/validationHandler';
import { authenticateUser } from '../controllers/auth.controller';

// initialize router
const router = Router();

// all user routes

// Route to get users
router.post(
  '/',
  checkSchema(AuthenticateUserValidationSchema),
  validate,
  authenticateUser
);

// Route to refetch the expired jwt token 
// router.post(
//   "/",
  
// )

export default router;
