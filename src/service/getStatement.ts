import Statement from '../models/Statement';
import GetStatementOptions from './options/GetStatementOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<Statement> => {
    const models = await config.repo.getStatement(opts);
    return models.statement;
  };
};
