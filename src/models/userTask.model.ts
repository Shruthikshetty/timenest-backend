import mongoose, { Types } from 'mongoose';
import { TaskProgressTypes } from '../commons/constants/model.constants';

const userTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    taskId: {
      type: Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    // in percentage 0-100
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    status: {
      type: String,
      enum: TaskProgressTypes,
      default: TaskProgressTypes[0],
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Add compound unique index
// user can and a task only once (prevents duplicate entry)
userTaskSchema.index(
  { userId: 1, taskId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      userId: { $exists: true },
      taskId: { $exists: true },
    },
  }
);

// create a model from the schema
const UserTask = mongoose.model('UserTask', userTaskSchema);

// export the model
export default UserTask;
