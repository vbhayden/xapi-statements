import { includes } from 'lodash';
import Statement from '../models/Statement';
import GetStatementsByIdsOptions from '../repoFactory/options/GetStatementsByIdsOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementsByIdsOptions): Promise<Statement[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(opts.ids, model.statement.id) &&
        matchesClientOption(model, opts.client)
      );
    });
    const filteredStatements = filteredModels.map((model) => {
      return model.statement;
    });
    return filteredStatements;
  };
};
