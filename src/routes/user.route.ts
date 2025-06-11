/**
 * This file contains all the user related routes
 */

import { Router } from 'express';
import {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from '../controllers/user.controller';
import { checkSchema } from 'express-validator';
import { AddUserValidationSchema } from '../commons/validation-schema/users/add-user';
import { validate } from '../commons/middlewares/validationHandler';
import { requireAdmin } from '../commons/middlewares/authorizeAdmin';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { UpdateUserValidationSchema } from '../commons/validation-schema/users/update-user';

// initialize router
const router = Router();

// all user routes

// Route to get all users
router.get('/all', requireAdmin, getAllUsers);

// Route to get a single user
router.get('/', requireUser, getSingleUser);

// Route to add a user
router.post('/', checkSchema(AddUserValidationSchema), validate, addUser);

// Route to update user details
router.patch(
  '/',
  requireUser,
  checkSchema(UpdateUserValidationSchema),
  validate,
  updateUser
);

// export all user routes clubbed
export default router;
