import { Opts } from '../Signature';
import isMatchingRelatedActivity from './isMatchingRelatedActivity';
import isMatchingActivity from './isMatchingActivity';
import matchesModel from './matchesModel';

const matcher = (statementKey: string, activity: string, opts: Opts): Object => {
  return (
    opts.related_activities === true ?
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
