import Follower from '../../models/follower';

/**
 * Retrieves a list of followers for a given user.
 *
 * @param userId - The ID of the user whose followers are to be retrieved.
 * @param populate - If true, populates the 'following' field with user details excluding '__v', 'role', and 'password'; defaults to true.
 * @returns A Promise that resolves to an array of followers.
 */

export async function getFollowersWithOptions(userId: string, populate = true) {
  if (!populate) {
    return await Follower.find({ user: userId })
      .select('-__v')
      .populate('following', '-__v -role -password')
      .lean()
      .exec();
  } else {
    return await Follower.find({ user: userId }).select('-__v').lean().exec();
  }
}
