import mongoose, { Types, Document } from 'mongoose';
import { TaskDisplayMediaTypes } from '../commons/constants/model.constants';

//Interface
export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  createdBy: Types.ObjectId;
  description: string;
  category: string;
  timeToComplete: number;
  displayMedia: string;
}

//Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    timeToComplete: {
      //minutes
      type: Number,
      required: true,
    },
    displayMedia: {
      type: String,
    }, // URI for image or video
    displayMediaType: {
      type: String,
      enum: TaskDisplayMediaTypes,
      default: 'image',
    },
  },
  { timestamps: true }
);

// create a model from schema
const Task = mongoose.model('Task', taskSchema);

export default Task;
