import UnstoredStatementModel from '../models/UnstoredStatementModel';
import CreateStatementsOptions from '../repoFactory/options/CreateStatementsOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: CreateStatementsOptions) => Promise<UnstoredStatementModel[]>;
export default _default;
