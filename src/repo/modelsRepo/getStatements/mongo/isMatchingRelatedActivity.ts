import isMatchingActivity from './isMatchingActivity';
import isMatchingContextActivities from './isMatchingContextActivities';

const isMatchingRelatedActivity = (statementKey: string, activityId: string): Object => {
  return {
    $or: [
      {
        [`${statementKey}.object.objectType`]: 'Activity',
        ...isMatchingActivity(`${statementKey}.object`, activityId),
      },
      ...(
        statementKey !== 'statement' && statementKey !== 'refs.statement' ? [] : [{
          [`${statementKey}.object.objectType`]: 'SubStatement',
          ...isMatchingRelatedActivity(`${statementKey}.object`, activityId)
        }]
      ),
      isMatchingContextActivities(statementKey, activityId)
    ]
  };
};

export default isMatchingRelatedActivity;
