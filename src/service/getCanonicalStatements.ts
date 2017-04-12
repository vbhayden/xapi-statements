import Statement from '../models/Statement';
import GetCanonicalStatementsOptions from './options/GetCanonicalStatementsOptions';
import Config from './Config';
import formatStatement from './utils/canonicalFormat/statement';
import getStatements from './utils/getStatements';

export default (config: Config) => {
  return async (opts: GetCanonicalStatementsOptions): Promise<Statement[]> => {
    const models = await getStatements(config)(opts);
    return models.map((model): Statement => {
      return formatStatement(model.statement, opts.langs);
    });
  };
};
