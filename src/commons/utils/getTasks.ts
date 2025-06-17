import Task from '../../models/task.model';

/**
 * Retrieves a list of tasks with optional population of the 'createdBy' field with user details
 * excluding '__v', 'role', 'password', 'createdAt', and 'updatedAt' if fullDetails is true.
 *
 * @param fullDetails - If true, populates the 'createdBy' field with user details; defaults to true.
 * @param start - The start index of the query; defaults to 0.
 * @param limit - The limit of the query; defaults to 100.
 * @returns A Promise that resolves to an array of tasks.
 */
export const getTaskWithOptions = (
  fullDetails = true,
  start = 0,
  limit = 100
) => {
  // handle non numeric and negative start and limit inputs
  if (isNaN(start) || start < 0) {
    start = 0;
  }
  if (isNaN(limit) || limit < 0) {
    limit = 100;
  }
  switch (fullDetails) {
    case true:
      return Task.find()
        .skip(start)
        .limit(limit)
        .populate({
          path: 'createdBy',
          select: '-__v -role -password -createdAt -updatedAt',
          model: 'User'
        })
        .select('-__v')
        .lean()
        .exec();
    case false:
      return Task.find().skip(start).limit(limit).select('-__v').lean().exec();
  }
};
