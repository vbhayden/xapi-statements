import GetUpRefIdsOptions from '../repo/GetUpRefIdsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetUpRefIdsOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const results = await collection.find({
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': opts.id,
    }).project({
      _id: 0,
      value: '$statement.id',
    }).toArray() as { value: string }[];

    return results.map((result) => {
      return result.value;
    });
  };
};
