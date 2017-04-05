import StatementModel from '../models/StatementModel';
import GetStatementOptions from './options/GetStatementOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: GetStatementOptions): Promise<StatementModel> => {

  };
};
