/**
 * @file Defines the User model schema for MongoDB using Mongoose.
 */

import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { Patterns } from '../commons/constants/patterns';

/**
 * Interface for User document.
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  task: number;
  ratings: number;
  designation: string;
  role: 'user' | 'admin';
  mentor: boolean;
  // eslint-disable-next-line no-unused-vars
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

/**
 * User schema definition.
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
      match: [Patterns.email, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    task: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    mentor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook to hash the password if it is modified.
 */
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

/**
 * Method to compare a candidate password with the hashed password.
 */
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * User model export.
 */
const User = model<IUser>('User', userSchema);
export default User;
