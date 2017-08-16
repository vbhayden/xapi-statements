import StoredStatementModel from '../models/StoredStatementModel';
import GetStatementOptions from '../repoFactory/options/GetStatementOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStatementOptions) => Promise<StoredStatementModel>;
export default _default;
