import GetVoidersOptions from '../repo/GetVoidersOptions';
import voidVerbId from '../utils/voidVerbId';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const results = await collection.find({
      'statement.verb.id': voidVerbId,
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': { $in: opts.ids },
    }).project({
      _id: 0,
      value: '$statement.object.id',
    }).toArray() as { value: string }[];

    return results.map((result) => {
      return result.value;
    });
  };
};
