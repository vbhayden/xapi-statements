import StatementBase from '../../models/StatementBase';
import isMatchingActivities from './isMatchingActivities';

export default (statement: StatementBase, activityId: string): boolean => {
  const context = statement.context;
  if (context !== undefined && context.contextActivities !== undefined) {
    const contextActivities = context.contextActivities;
    return (
      isMatchingActivities(contextActivities.parent, activityId) ||
      isMatchingActivities(contextActivities.grouping, activityId) ||
      isMatchingActivities(contextActivities.category, activityId) ||
      isMatchingActivities(contextActivities.other, activityId)
    );
  }
  return false;
};
