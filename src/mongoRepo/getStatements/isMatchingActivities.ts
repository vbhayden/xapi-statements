import isMatchingActivity from './isMatchingActivity';

export default (activitiesKey: string, activityId: string): Object => {
  return isMatchingActivity(activitiesKey, activityId);
};
