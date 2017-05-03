import { includes } from 'lodash';
import StatementModel from '../models/StatementModel';
import GetStatementsByIdsOptions from '../repo/GetStatementsByIdsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementsByIdsOptions): Promise<StatementModel[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(opts.ids, model.statement.id)
      );
    });
    return filteredModels;
  };
};
