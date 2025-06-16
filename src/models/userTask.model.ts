//@TODO in progress
import mongoose from 'mongoose';

const userTaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    progress: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['planned', 'inProgress', 'complete', 'quit'],
      default: 'planned',
    },
    startedAt: { type: Date },
    completedAt: { type: Date },
  },
  { timestamps: true, unique: ['userId', 'taskId'] }
);

const UserTask = mongoose.model('UserTask', userTaskSchema);

module.exports = UserTask;
