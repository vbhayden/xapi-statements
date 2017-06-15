import StatementHash from '../models/StatementHash';
import GetHashesOptions from '../repo/GetHashesOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetHashesOptions): Promise<StatementHash[]> => {
    const collection = (await config.db).collection('statements')
    const filteredHashes = await collection.find({
      'statement.id': { $in: opts.ids },
    }).project({
      _id: 0,
      statementId: '$statement.id',
      hash: '$hash',
    }).toArray() as StatementHash[];

    return filteredHashes;
  };
};
