import StatementBase from '../../models/StatementBase';
import isMatchingActivity from './isMatchingActivity';
import isMatchingContextActivities from './isMatchingContextActivities';

const isMatchingRelatedActivity = (statement: StatementBase, activityId: string): boolean => {
  return (
    (
      statement.object.objectType === 'Activity' &&
      isMatchingActivity(statement.object, activityId)
    ) ||
    (
      statement.object.objectType === 'SubStatement' &&
      isMatchingRelatedActivity(statement.object, activityId)
    ) ||
    isMatchingContextActivities(statement, activityId)
  );
};

export default isMatchingRelatedActivity;
