/**
 * @file Combines and exports all feature-specific routers for the API.
 * Add new feature routers here to make them available under the main API path.
 */

import { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';
import messageRoute from './message.route';
import followerRoute from './follower.route';
import reviewRoute from './review.route';
import mentorRoute from './mentor.route';
import taskRoute from './task.route';
import userTaskRoute from './user-task.route';
import uploadRoute from './upload.route';

// Initialize the main router
const router = Router();

/**
 * Mount user-related routes under '/users'.
 * Example: GET /api/users/
 */
router.use('/users', userRoute);
/**
 * Mount user-auth routes "/auth"
 */
router.use('/auth', authRoute);
/**
 * Mount all the message routes "/messages"
 */
router.use('/messages', messageRoute);
/**
 * Mount all the follower routes "/followers"
 */
router.use('/followers', followerRoute);
/**
 * Mount all the Review routes "/reviews"
 */
router.use('/reviews', reviewRoute);
/**
 * Mount all the mentor routes "/mentors"
 */
router.use('/mentors', mentorRoute);
/**
 * Mount all the task routes "/tasks"
 */
router.use('/tasks', taskRoute);
/**
 * Mount all user task routes "/user-tasks"
 */
router.use('/user-tasks', userTaskRoute);
/**
 *  Mount all upload routes "/upload"
 */
router.use('/uploads', uploadRoute);
/**
 * Export the combined router to be used in the main app.
 */
export default router;
