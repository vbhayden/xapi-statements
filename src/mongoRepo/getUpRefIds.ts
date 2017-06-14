import StatementModel from '../models/StatementModel';
import GetUpRefIdsOptions from '../repo/GetUpRefIdsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetUpRefIdsOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const filteredModels = await collection.find({
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': opts.id,
    }).toArray() as StatementModel[];

    return filteredModels.map((model) => {
      return model.statement.id;
    });
  };
};
