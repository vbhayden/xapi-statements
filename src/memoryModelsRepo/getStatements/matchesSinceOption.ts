import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.since === undefined ? true :
    statement.stored > opts.since
  );
};
