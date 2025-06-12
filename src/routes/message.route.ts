/**
 * @file contains all the routes related to message
 */

import { Router } from 'express';
import { requireUser } from '../commons/middlewares/authorizeUser';
import { checkSchema } from 'express-validator';
import { AddMessageValidationSchema } from '../commons/validation-schema/message/add-message';
import { validate } from '../commons/middlewares/validationHandler';
import { getMessages, sendMessage } from '../controllers/message.controller';

// initialize router
const router = Router();

// Route to send message (add new)
router.post(
  '/',
  requireUser,
  checkSchema(AddMessageValidationSchema),
  validate,
  sendMessage
);

// Route to get message between sender and receiver
router.get('/:receiverId', requireUser, getMessages);

//Route to get all user messages
router.get('/', requireUser, getMessages);

// export all user routes clubbed
export default router;
