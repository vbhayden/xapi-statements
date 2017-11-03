import Statement from '../../../../models/Statement';
import { Opts } from '../Signature';
import isMatchingRelatedActivity from './isMatchingRelatedActivity';
import isMatchingActivity from './isMatchingActivity';
import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (statement: Statement, opts: Opts): boolean => {
  return (
    opts.activity === undefined ? true :
      (
        opts.related_activities === true ?
          isMatchingRelatedActivity(statement, opts.activity) :
          (
            statement.object.objectType === 'Activity' &&
            isMatchingActivity(statement.object, opts.activity)
          )
      )
  );
};

export default matchesModel(matcher) as ModelMatcher;
