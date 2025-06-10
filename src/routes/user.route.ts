/**
 * This file contains all the user related routes
 */

import { Router } from 'express';
import { addUser, getAllUsers } from '../controllers/user.controller';
import { checkSchema } from 'express-validator';
import { AddUserValidationSchema } from '../commons/validation-schema/users/add-user';
import { validate } from '../commons/middlewares/validationHandler';

// initialize router
const router = Router();

// all user routes

// Route to get users
router.get('/', getAllUsers);

// Route to add a user
router.post('/', checkSchema(AddUserValidationSchema), validate, addUser);

// export all user routes clubbed
export default router;
