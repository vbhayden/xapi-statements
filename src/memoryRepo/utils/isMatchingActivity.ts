import Activity from '../../models/Activity';

export default (activity: Activity, activityId: string): boolean => {
  return (
    activity.objectType === 'Activity' &&
    activity.id === activityId
  );
};
