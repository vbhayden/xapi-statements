import Statement from '../../models/Statement';
import StatementModel from '../../models/StatementModel';
import GetStatementsOptions from '../../repo/GetStatementsOptions';

export type Matcher = (statement: Statement, opts: GetStatementsOptions) => boolean;

export default (matcher: Matcher) => {
  return (model: StatementModel, opts: GetStatementsOptions): boolean => {
    return (
      matcher(model.statement, opts) ||
      model.refs.filter((ref) => {
        return matcher(ref.statement, opts);
      }).length > 0
    );
  };
};
