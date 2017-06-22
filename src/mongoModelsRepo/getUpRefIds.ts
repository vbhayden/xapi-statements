import GetUpRefIdsOptions from '../repo/GetUpRefIdsOptions';
import Config from './Config';

interface Result {
  statement: {
    id: string;
  }
}

export default (config: Config) => {
  return async (opts: GetUpRefIdsOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const results = await collection.find({
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': opts.id,
    }).project({
      _id: 0,
      'statement.id': 1,
    }).toArray() as Result[];

    return results.map((result) => {
      return result.statement.id;
    });
  };
};
