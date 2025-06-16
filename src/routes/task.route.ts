/**
 * This @file contains all the routes related to task
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { addTask, getTasks } from '../controllers/task.controller';
import { checkSchema } from 'express-validator';
import { addTaskValidationSchema } from '../commons/validation-schema/task/add-task';
import { validate } from '../commons/middlewares/validationHandler';

//initializer router
const router = Router();

// Route to get tasks
router.get('/', requireUser, getTasks);

// Route to add a new task
router.post(
  '/',
  requireUser,
  checkSchema(addTaskValidationSchema),
  validate,
  addTask
);

//export all the routes clubbed
export default router;
