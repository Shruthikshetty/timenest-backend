/**
 * This @file contains all the routes related to task
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { addTask, deleteTask, getTasks } from '../controllers/task.controller';
import { checkSchema } from 'express-validator';
import { AddTaskValidationSchema } from '../commons/validation-schema/task/add-task';
import { validate } from '../commons/middlewares/validationHandler';
import { DeleteTaskValidationSchema } from '../commons/validation-schema/task/delete-task';

//initializer router
const router = Router();

// Route to get tasks
router.get('/', requireUser, getTasks);

// Route to add a new task
router.post(
  '/',
  requireUser,
  checkSchema(AddTaskValidationSchema),
  validate,
  addTask
);

//Route to delete a task
router.delete(
  '/',
  requireUser,
  checkSchema(DeleteTaskValidationSchema),
  validate,
  deleteTask
);

//export all the routes clubbed
export default router;
