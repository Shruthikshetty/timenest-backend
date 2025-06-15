/**
 * @file contains all the controllers related to the messages
 */

import { Response, Request } from 'express';
import { ValidatedRequest } from '../types/custom-types';
import { handleError } from '../commons/utils/handleError';
import { SendMessageReq } from '../commons/validation-schema/message/add-message';
import Message, { IMessage } from '../models/message';
import { MessageLimits } from '../commons/constants/logic.constants';
import { io } from '../index';

/**
 * this is the controller used for sending a message (adding a message between sender and receiver)
 */
export const sendMessage = async (
  req: ValidatedRequest<SendMessageReq>,
  res: Response
) => {
  try {
    // extract data from validated request body
    const { content, receiver, type = 'text' } = req.validatedData!;

    // extract  sender details from authorized user
    const { _id } = req.user!;

    // create a new message
    const newMessage = new Message({
      sender: _id,
      receiver,
      content,
      type,
    });

    // save the new message
    const savedMessage = await newMessage.save();

    // Emit the message to the receiver and sender via Socket.io
    io.to(receiver.toString()).emit('receive_message', newMessage);
    io.to(_id.toString()).emit('receive_message', newMessage); // sender

    // send response with the saved message
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: savedMessage,
    });
  } catch (err) {
    // handle thrown errors
    handleError(res, { error: err });
  }
};

//get messages of a user
//messages/:receiverId
export const getMessages = async (
  req: ValidatedRequest<undefined>,
  res: Response
) => {
  try {
    // extract id from validated user
    const { _id: senderId } = req.user!;

    // from params
    const receiverId = (req as unknown as Request).params.receiverId;

    // Pagination: Parse from query and set sensible defaults/bounds
    // Parse and validate pagination parameters
    let start = parseInt((req as unknown as Request).query.start as string, 10);
    let limit = parseInt((req as unknown as Request).query.limit as string, 10);

    // Validate start
    if (isNaN(start) || start < 0) {
      start = 0;
    }

    // Validate limit
    if (isNaN(limit) || limit < MessageLimits.min) {
      limit = MessageLimits.min;
    } else if (limit > MessageLimits.max) {
      limit = MessageLimits.max;
    }

    // define a message
    let messages: IMessage[];

    if (receiverId) {
      // get two and fro message between the 2 users
      messages = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId },
        ],
      })
        .sort({ createdAt: 1 }) // Sort oldest -> newest
        .skip(start)
        .limit(limit)
        .lean();
    } else {
      // get all user messages
      messages = await Message.find({
        $or: [{ sender: senderId }, { receiver: senderId }],
      })
        .sort({ createdAt: 1 })
        .skip(start)
        .limit(limit)
        .lean();
    }

    // send response
    res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
    return;
  }
};
