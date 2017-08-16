import { ObjectID } from 'mongodb';
import UnstoredStatementModel from '../models/UnstoredStatementModel';
import CreateStatementsOptions from '../repoFactory/options/CreateStatementsOptions';
import { encodeDotsInStatement } from './utils/replaceDotsInStatement';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<UnstoredStatementModel[]> => {
    if (opts.models.length === 0) {
      return [];
    }
    
    const documents = opts.models.map( (model) => {
      const statement = encodeDotsInStatement(model.statement);
      return {
        ...model,
        organisation: new ObjectID(model.organisation),
        lrs_id: new ObjectID(model.lrs_id),
        client: new ObjectID(model.client),
        statement
      };
    });

    const collection = (await config.db).collection('statements');
    await collection.insertMany(documents);
    return opts.models;
  };
};
