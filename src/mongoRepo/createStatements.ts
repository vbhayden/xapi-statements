import StatementModel from '../models/StatementModel';
import CreateStatementsOptions from '../repo/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<StatementModel[]> => {
    if (opts.models.length === 0) return opts.models;

    const collection = (await config.db).collection('statements')
    await collection.insertMany(opts.models);
    return opts.models;
  };
};
