// src/models/message.model.ts
//@TODO in progress
// import { Document, Schema, model, Types } from 'mongoose';

// export interface IMessage extends Document {
//   sender: Types.ObjectId;
//   receiver: Types.ObjectId;
//   type: 'text' | 'image';
//   content: string;
//   read: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }


// const MessageSchema = new Schema<IMessage>(
//   {
//     sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     type: { type: String, enum: ['text', 'image'], default: 'text' },
//     content: { type: String, required: true }, // For images, this can be a URL or file reference in future
//     read: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );
