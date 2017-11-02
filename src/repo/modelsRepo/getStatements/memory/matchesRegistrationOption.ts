import Statement from '../../../../models/Statement';
import { Opts } from '../Signature';
import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (statement: Statement, opts: Opts): boolean => {
  return (
    opts.registration === undefined ? true :
      (
        statement.context !== undefined &&
        statement.context.registration === opts.registration
      )
  );
};

export default matchesModel(matcher) as ModelMatcher;
