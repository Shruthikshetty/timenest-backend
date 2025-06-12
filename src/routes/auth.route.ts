/**
 * @file contains all the user auth routes
 */

import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { AuthenticateUserValidationSchema } from '../commons/validation-schema/auth/validate-user';
import { validate } from '../commons/middlewares/validationHandler';
import {
  authenticateUser,
  logout,
  refreshToken,
} from '../controllers/auth.controller';

// initialize router
const router = Router();

// all user routes

// Route to authenticate user (login)
router.post(
  '/',
  checkSchema(AuthenticateUserValidationSchema),
  validate,
  authenticateUser
);

// Route to refetch the expired jwt token
router.post('/refresh-token', refreshToken);

// Route to log out and clear cookies
router.post('/logout', logout);

export default router;
