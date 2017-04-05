import { includes } from 'lodash';
import StatementModel from '../models/StatementModel';
import GetVoidersOptions from '../repo/GetVoidersOptions';
import voidVerbId from '../utils/voidVerbId';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.verb.id === voidVerbId &&
        model.statement.object.objectType === 'StatementRef' &&
        includes(opts.ids, model.statement.object.id)
      );
    });
    return filteredModels.map((model: StatementModel): string => {
      if (model.statement.object.objectType === 'StatementRef') {
        return model.statement.object.id;
      }
      throw new Error('No longer a StatementRef.');
    });
  };
};
