import { includes } from 'lodash';
import StoredStatementModel from '../models/StoredStatementModel';
import GetVoidersOptions from '../repo/GetVoidersOptions';
import voidVerbId from '../utils/voidVerbId';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.verb.id === voidVerbId &&
        model.statement.object.objectType === 'StatementRef' &&
        includes(opts.ids, model.statement.id)
      );
    });
    return filteredModels.map((model: StoredStatementModel): string => {
      return model.statement.id;
    });
  };
};
