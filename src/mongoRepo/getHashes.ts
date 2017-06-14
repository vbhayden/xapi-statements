import StatementHash from '../models/StatementHash';
import StatementModel from '../models/StatementModel';
import GetHashesOptions from '../repo/GetHashesOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetHashesOptions): Promise<StatementHash[]> => {
    const collection = (await config.db).collection('statements')
    const filteredModels = await collection.find({
      'statement.id': { $in: opts.ids },
    }).toArray() as StatementModel[];

    return filteredModels.map((model): StatementHash => {
      return {
        statementId: model.statement.id,
        hash: model.hash,
      };
    });
  };
};
