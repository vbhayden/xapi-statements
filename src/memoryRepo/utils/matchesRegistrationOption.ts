import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.registration === undefined ? true :
    (
      statement.context !== undefined &&
      statement.context.registration === opts.registration
    )
  );
};
