//@TODO in progress
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
      type: Number,
      required: true,
    },
    displayMedia: {
      type: String,
      required: true,
    }, // URI for image or video
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
