import Statement from '../models/Statement';
import GetStatementsByIdsOptions from '../repoFactory/options/GetStatementsByIdsOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStatementsByIdsOptions) => Promise<Statement[]>;
export default _default;
