/**
 * @file contains all the routes for the follower
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import {
  getFollowers,
  addFollower,
  deleteFollower,
  getFollowerDetail,
  followerCount,
} from '../controllers/follower.controller';
import { checkSchema } from 'express-validator';
import { validate } from '../commons/middlewares/validationHandler';
import { AddFollowerValidationSchema } from '../commons/validation-schema/follower/add-follower';

//initialize router
const router = Router();

//Route to get all users that a user is following
router.get('/', requireUser, getFollowers);

//Route to add a new follower
router.post(
  '/',
  requireUser,
  checkSchema(AddFollowerValidationSchema),
  validate,
  addFollower
);

//Route to remove a follower
router.delete(
  '/',
  requireUser,
  checkSchema(AddFollowerValidationSchema),
  validate,
  deleteFollower
);

// Route to get a single follower details
router.get('/details/:followingId', requireUser, getFollowerDetail);

// Route to get the count of followers and following users for a user
router.get('/count', requireUser, followerCount);

//export all user routes clubbed
export default router;
