import GetVoidersOptions from '../../repoFactory/options/GetVoidersOptions';
import voidQuery from '../utils/voidQuery';
import Config from '../Config';

export interface Options extends GetVoidersOptions {
  config: Config;
  searchKey: string;
}

export default async ({ config, searchKey, ids }: Options) => {
  const collection = (await config.db).collection('statements');
  const query = { [searchKey]: { $in: ids }, ...voidQuery };
  const project = { [searchKey]: 1 };
  const results = await collection.find(query).project(project).toArray();
  return results;
};
