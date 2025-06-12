/**
 * @file Combines and exports all feature-specific routers for the API.
 * Add new feature routers here to make them available under the main API path.
 */

import { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';
import messageRoute from './message.route';

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
 * Export the combined router to be used in the main app.
 */
export default router;
