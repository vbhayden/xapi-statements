import GetStatementsOptions from '../../repo/GetStatementsOptions';
import isMatchingRelatedActivity from './isMatchingRelatedActivity';
import isMatchingActivity from './isMatchingActivity';
import matchesModel from './matchesModel';

const matcher = (statementKey: string, activity: string, opts: GetStatementsOptions): Object => {
  return (
    opts.relatedActivities === true ?
    isMatchingRelatedActivity(statementKey, activity) :
    {
      [`${statementKey}.object.objectType`]: 'Activity',
      ...isMatchingActivity(`${statementKey}.object`, activity),
    }
  );
};

export default matchesModel<string>(matcher, (opts) => {
  return opts.activity;
});
