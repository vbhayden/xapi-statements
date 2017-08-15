import UnstoredStatementModel from '../models/UnstoredStatementModel';
import CreateStatementsOptions from '../repoFactory/options/CreateStatementsOptions';
import { encodeDotsInStatement } from './utils/replaceDotsInStatement';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<UnstoredStatementModel[]> => {
    if (opts.models.length === 0) {
      return [];
    }

    const collection = (await config.db).collection('statements');
    const documents = opts.models.map((model) => {
      const statement = encodeDotsInStatement(model.statement);
      return { ...model, statement };
    });
    await collection.insertMany(documents);
    return opts.models;
  };
};
