import UpRef from '../models/UpRef';
import GetUpRefsByIdsOptions from '../repo/GetUpRefsByIdsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetUpRefsByIdsOptions): Promise<UpRef[]> => {
    const collection = (await config.db).collection('statements');
    const results = await collection.find({
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': { $in: opts.targetIds },
    }).project({
      sourceId: '$statement.id',
      targetId: '$statement.object.id',
    }).toArray() as UpRef[];

    return results;
  };
};
