/**
 * @file contains all the routes for the follower
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { getFollowers } from '../controllers/follower.controller';

//initialize router
const router = Router();

//Route to get all users that a user is following 
router.get('/', requireUser, getFollowers);

//export all user routes clubbed
export default router;