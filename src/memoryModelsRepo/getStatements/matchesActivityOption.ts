import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import isMatchingRelatedActivity from './isMatchingRelatedActivity';
import isMatchingActivity from './isMatchingActivity';
import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.activity === undefined ? true :
      (
        opts.relatedActivities === true ?
          isMatchingRelatedActivity(statement, opts.activity) :
          (
            statement.object.objectType === 'Activity' &&
            isMatchingActivity(statement.object, opts.activity)
          )
      )
  );
};

export default matchesModel(matcher) as ModelMatcher;
