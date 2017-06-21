import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import matchesModel from './matchesModel';

const matcher = (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.verb === undefined ? true :
    statement.verb.id === opts.verb
  );
};

export default matchesModel(matcher);
