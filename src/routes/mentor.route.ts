/**
 * This @file contains all the routes related to mentor
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { getMentors } from '../controllers/mentor.controller';

// initialize router
const router = Router();

// Route to get all mentors
router.get('/', requireUser, getMentors);

// export all the routes clubbed
export default router;
