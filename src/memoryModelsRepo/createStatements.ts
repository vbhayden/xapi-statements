import { v1 as uuid } from 'uuid';
import UnstoredStatementModel from '../models/UnstoredStatementModel';
import CreateStatementsOptions from '../repo/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<UnstoredStatementModel[]> => {
    const idModels = opts.models.map((model) => {
      return {
        ...model,
        _id: uuid(),
      };
    });
    config.state.statements = config.state.statements.concat(idModels);
    return opts.models;
  };
};
