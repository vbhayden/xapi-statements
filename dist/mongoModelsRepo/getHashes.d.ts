import StatementHash from '../models/StatementHash';
import GetHashesOptions from '../repoFactory/options/GetHashesOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetHashesOptions) => Promise<StatementHash[]>;
export default _default;
