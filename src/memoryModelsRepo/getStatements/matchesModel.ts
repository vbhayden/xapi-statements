import Statement from '../../models/Statement';
import StoredStatementModel from '../../models/StoredStatementModel';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';

export type Matcher = (statement: Statement, opts: GetStatementsOptions) => boolean;
export type ModelMatcher = (model: StoredStatementModel, opts: GetStatementsOptions) => boolean;

export default (matcher: Matcher): ModelMatcher => {
  return (model, opts) => {
    return (
      model.voided === false &&
      (
        matcher(model.statement, opts) ||
        model.refs.filter((ref) => {
          return matcher(ref.statement, opts);
        }).length > 0
      )
    );
  };
};
