import StatementsResult from '../models/StatementsResult';
import GetStatementOptions from '../serviceFactory/options/GetStatementOptions';
import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import checkScopes from './utils/checkScopes';
import getStatementsResult from './utils/getStatementsResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StatementsResult> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);
    const model = await config.repo.getStatement(opts);
    return getStatementsResult(config, opts, [model]);
  };
};
