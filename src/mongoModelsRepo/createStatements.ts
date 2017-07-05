import UnstoredStatementModel from '../models/UnstoredStatementModel';
import CreateStatementsOptions from '../repoFactory/options/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<UnstoredStatementModel[]> => {
    if (opts.models.length === 0) {
      return [];
    }

    const collection = (await config.db).collection('statements');
    await collection.insertMany(opts.models);
    return opts.models;
  };
};
