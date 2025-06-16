/**
 * This @file contains all the routes related to task
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { getTasks } from '../controllers/task.controller';

//initializer router
const router = Router();

// Route to get tasks
router.get('/', requireUser, getTasks);

//export all the routes clubbed
export default router;
