/**
 * @file contains all the controllers related to the messages
 */

import { Response } from 'express';
import { ValidatedRequest } from '../types/custom-types';
import { handleError } from '../commons/utils/handleError';
import { SendMessageReq } from '../commons/validation-schema/message/add-message';
import Message, { IMessage } from '../models/message';

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
    const user = req.user!;

    // create a new message
    const newMessage = new Message({
      sender: user._id,
      receiver,
      content,
      type,
    });

    // save the new message
    const savedMessage = await newMessage.save();

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
export const getMessages = async (req: ValidatedRequest<{}>, res: Response) => {
  try {
    // extract id from validated user
    const { _id: senderId } = req.user!;

    // from params
    const receiverId = req.params.receiverId;

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
        .lean();
    } else {
      // get all user messages
      messages = await Message.find({
        $or: [{ sender: senderId }, { receiver: senderId }],
      })
        .sort({ createdAt: 1 })
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
