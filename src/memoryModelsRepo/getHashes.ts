import { includes } from 'lodash';
import StatementHash from '../models/StatementHash';
import StatementModel from '../models/StatementModel';
import GetHashesOptions from '../repo/GetHashesOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetHashesOptions): Promise<StatementHash[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(opts.ids, model.statement.id)
      );
    });
    return filteredModels.map((model: StatementModel): StatementHash => {
      return {
        statementId: model.statement.id,
        hash: model.hash,
      };
    });
  };
};
