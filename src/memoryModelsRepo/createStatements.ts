import StatementModel from '../models/StatementModel';
import CreateStatementsOptions from '../repo/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<StatementModel[]> => {
    config.state.statements = config.state.statements.concat(opts.models);
    return opts.models;
  };
};
