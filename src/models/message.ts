//@TODO in progress
import { Document, Schema, model, Types } from 'mongoose';
import { MessageTypes } from '../commons/constants/model.constants';

/**
 * Message interface defined
 */
export interface IMessage extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  type: 'text' | 'image';
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for Message
 */
const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: MessageTypes,
      default: 'text',
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// create the Message model from the defined schema
const Message = model<IMessage>('Message', MessageSchema);
//export he model
export default Message;
