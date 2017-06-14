export default (activityKey: string, activityId: string): Object => {
  return {
    [`${activityKey}.objectType`]: 'Activity',
    [`${activityKey}.id`]: activityId,
  };
};
