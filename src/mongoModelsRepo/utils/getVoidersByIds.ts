import GetVoidersOptions from '../../repoFactory/options/GetVoidersOptions';
import voidVerbId from '../../utils/voidVerbId';
import Config from '../Config';

interface Options extends GetVoidersOptions {
  config: Config;
  searchKey: string;
}

export default async ({ config, searchKey, ids }: Options): Promise<any[]> => {
  const collection = (await config.db).collection('statements');
  const results = await collection.find({
    'statement.verb.id': voidVerbId,
    'statement.object.objectType': 'StatementRef',
    [searchKey]: { $in: ids },
  }).project({
    _id: 0,
    [searchKey]: 1,
  }).toArray();
  return results;
};
