import StatementsResult from '../models/StatementsResult';
import GetStatementOptions from '../serviceFactory/options/GetStatementOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStatementOptions) => Promise<StatementsResult>;
export default _default;
