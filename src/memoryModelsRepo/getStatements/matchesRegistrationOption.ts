import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import matchesModel from './matchesModel';

const matcher = (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.registration === undefined ? true :
      (
        statement.context !== undefined &&
        statement.context.registration === opts.registration
      )
  );
};

export default matchesModel(matcher);
