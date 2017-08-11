import StoredStatementModel from '../../models/StoredStatementModel';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import Config from '../Config';
declare const _default: (config: Config) => (opts: GetStatementsOptions) => Promise<StoredStatementModel[]>;
export default _default;
