import Statement from '../../../../models/Statement';
import StoredStatementModel from '../../../../models/StoredStatementModel';
import { Opts } from '../Signature';

export type Matcher = (statement: Statement, opts: Opts) => boolean;
export type ModelMatcher = (model: StoredStatementModel, opts: Opts) => boolean;

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
