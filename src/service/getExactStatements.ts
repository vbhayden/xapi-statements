import Statement from '../models/Statement';
import GetStatementsOptions from './options/GetStatementsOptions';
import Config from './Config';
import getStatements from './utils/getStatements';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<Statement[]> => {
    const models = await getStatements(config)(opts);
    return models.map((model) => {
      return model.statement;
    });
  };
};
