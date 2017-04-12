import Activity from '../../../models/Activity';
import IdFormattedActivity from '../../../models/IdFormattedActivity';

export default (activity: Activity): IdFormattedActivity => {
  return {
    objectType: activity.objectType,
    id: activity.id,
  };
};
