import isMatchingActivities from './isMatchingActivities';

export default (statementKey: string, activityId: string): Object => {
  const contextActivitiesKey = `${statementKey}.context.contextActivities`;
  return {
    $or: [
      isMatchingActivities(`${contextActivitiesKey}.parent`, activityId),
      isMatchingActivities(`${contextActivitiesKey}.grouping`, activityId),
      isMatchingActivities(`${contextActivitiesKey}.category`, activityId),
      isMatchingActivities(`${contextActivitiesKey}.other`, activityId),
    ]
  };
};
