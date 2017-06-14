import StatementModel from '../models/StatementModel';
import GetVoidersOptions from '../repo/GetVoidersOptions';
import voidVerbId from '../utils/voidVerbId';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const filteredModels = await collection.find({
      'statement.verb.id': voidVerbId,
      'statement.object.objectType': 'StatementRef',
      'statement.id': { $in: opts.ids },
    }).toArray() as StatementModel[];

    return filteredModels.map((model: StatementModel): string => {
      return model.statement.id;
    });
  };
};
