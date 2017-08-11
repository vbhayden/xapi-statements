import Statement from '../../models/Statement';
import StoredStatementModel from '../../models/StoredStatementModel';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
export declare type Matcher = (statement: Statement, opts: GetStatementsOptions) => boolean;
export declare type ModelMatcher = (model: StoredStatementModel, opts: GetStatementsOptions) => boolean;
declare const _default: (matcher: Matcher) => ModelMatcher;
export default _default;
