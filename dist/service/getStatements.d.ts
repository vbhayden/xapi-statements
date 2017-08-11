import GetStatementsOptions from '../serviceFactory/options/GetStatementsOptions';
import StatementsResult from '../models/StatementsResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStatementsOptions) => Promise<StatementsResult>;
export default _default;
