import { ObjectID } from 'mongodb';
import UnstoredStatementModel from '../models/UnstoredStatementModel';
import CreateStatementsOptions from '../repoFactory/options/CreateStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateStatementsOptions): Promise<UnstoredStatementModel[]> => {
    if (opts.models.length === 0) {
      return [];
    }
    
    const models = opts.models.map( (model) => {
      return { 
        ...model, 
        organisation: new ObjectID(model.organisation),
        lrs_id: new ObjectID(model.lrs_id),
        client: new ObjectID(model.client)
      };
    });

    const collection = (await config.db).collection('statements');
    await collection.insertMany(models);
    return opts.models;
  };
};
