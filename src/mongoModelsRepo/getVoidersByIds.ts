import GetVoidersOptions from '../repo/GetVoidersOptions';
import voidVerbId from '../utils/voidVerbId';
import Config from './Config';

interface Result {
  statement: {
    id: string;
  }
}

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const results = await collection.find({
      'statement.verb.id': voidVerbId,
      'statement.object.objectType': 'StatementRef',
      'statement.id': { $in: opts.ids },
    }).project({
      _id: 0,
      'statement.id': 1,
    }).toArray() as Result[];

    return results.map((result) => {
      return result.statement.id;
    });
  };
};
