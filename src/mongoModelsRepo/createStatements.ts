import UnStoredStatementModel from '../models/UnStoredStatementModel';
import CreateStatementsOptions from '../repo/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<UnStoredStatementModel[]> => {
    if (opts.models.length === 0) {
      return [];
    }

    const collection = (await config.db).collection('statements');
    await collection.insertMany(opts.models);
    return opts.models;
  };
};
