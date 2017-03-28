import Activity from '../../models/Activity';
import isMatchingActivity from './isMatchingActivity';

export default (activities: Activity[] = [], activityId: string): boolean => {
  return activities.filter((activity) => {
    return isMatchingActivity(activity, activityId);
  }).length !== 0;
};
