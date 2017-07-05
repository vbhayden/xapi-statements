import UpRef from '../models/UpRef';
import GetUpRefsByIdsOptions from '../repoFactory/options/GetUpRefsByIdsOptions';
import Config from './Config';

interface Result {
  statement: {
    id: string;
    object: {
      id: string;
    }
  };
}

export default (config: Config) => {
  return async (opts: GetUpRefsByIdsOptions): Promise<UpRef[]> => {
    const collection = (await config.db).collection('statements');
    const results = await collection.find({
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': { $in: opts.targetIds },
    }).project({
      _id: 0,
      'statement.id': 1,
      'statement.object.id': 1,
    }).toArray() as Result[];

    return results.map((result) => {
      return {
        sourceId: result.statement.id,
        targetId: result.statement.object.id,
      };
    });
  };
};
