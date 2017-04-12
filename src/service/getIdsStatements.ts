import IdFormattedStatement from '../models/IdFormattedStatement';
import GetStatementsOptions from './options/GetStatementsOptions';
import Config from './Config';
import formatStatement from './utils/idsFormat/statement';
import getStatements from './utils/getStatements';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<IdFormattedStatement[]> => {
    const models = await getStatements(config)(opts);
    return models.map((model) => {
      return formatStatement(model.statement);
    });
  };
};
