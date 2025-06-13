/**
 * @file contains the follower model
 */

import { Schema, model, Document } from 'mongoose';

//type...
export interface IFollower extends Document {
  user: string;
  following: string;
}

// define the follower schema
const followerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// create the model from the schema
const Follower = model('Follower', followerSchema);

// export the follower model
export default Follower;
