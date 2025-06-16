/**
 * This @file contains all the routes related to mentor
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { getMentors, getMentorById } from '../controllers/mentor.controller';

// initialize router
const router = Router();

// Route to get all mentors
router.get('/', requireUser, getMentors);

// get mentor by id
router.get('/:mentorId', requireUser, getMentorById);

// export all the routes clubbed
export default router;
