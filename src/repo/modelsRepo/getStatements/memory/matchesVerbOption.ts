import Statement from '../../../../models/Statement';
import { Opts } from '../Signature';
import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (statement: Statement, opts: Opts): boolean => {
  return (
    opts.verb === undefined ? true :
      statement.verb.id === opts.verb
  );
};

export default matchesModel(matcher) as ModelMatcher;
