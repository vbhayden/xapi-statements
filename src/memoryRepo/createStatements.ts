import { v4 as uuid } from 'uuid';
import StatementModel from '../models/StatementModel';
import CreateStatementsOptions from '../repo/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<StatementModel[]> => {
    const idModels: StatementModel[] = opts.models.map((model) => {
      return {
        id: uuid(),
        ...model,
      };
    });
    config.state.statements = config.state.statements.concat(idModels);
    return idModels;
  };
};
