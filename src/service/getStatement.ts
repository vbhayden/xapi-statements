import Statement from '../models/Statement';
import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import GetStatementOptions from './options/GetStatementOptions';
import checkScopes from './utils/checkScopes';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<Statement> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);
    const models = await config.repo.getStatement(opts);
    return models.statement;
  };
};
