/**
 * @file contains all the routes related to user tasks
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { getUserTasks, addUserTask } from '../controllers/user-task.controller';
import { checkSchema } from 'express-validator';
import { validate } from '../commons/middlewares/validationHandler';
import { AddUserTaskValidationSchema } from '../commons/validation-schema/user-task/add-user-task';

//initializer router
const router = Router();

// Route to get all user tasks
router.get('/', requireUser, getUserTasks);

// Route to get add a task
router.post(
  '/',
  requireUser,
  checkSchema(AddUserTaskValidationSchema),
  validate,
  addUserTask
);

// export clubbed routes
export default router;
