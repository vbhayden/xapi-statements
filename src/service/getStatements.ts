import StatementModel from '../models/StatementModel';
import GetStatementsOptions from './options/GetStatementsOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: GetStatementsOptions): Promise<StatementModel[]> => {
    return [];
  };
};
