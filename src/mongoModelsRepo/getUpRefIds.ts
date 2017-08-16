import GetUpRefIdsOptions from '../repoFactory/options/GetUpRefIdsOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

interface Result {
  statement: {
    id: string;
  };
}

export default (config: Config) => {
  return async (opts: GetUpRefIdsOptions): Promise<string[]> => {
    const collection = (await config.db).collection('statements');
    const query = {
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': opts.id,
      ...matchesClientOption(opts.client)
    };
    const project = {
      _id: 0,
      'statement.id': 1,
    };

    const results = await collection.find(query).project(project).toArray() as Result[];

    return results.map((result) => {
      return result.statement.id;
    });
  };
};
