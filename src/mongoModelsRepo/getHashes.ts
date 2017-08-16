import StatementHash from '../models/StatementHash';
import GetHashesOptions from '../repoFactory/options/GetHashesOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

interface Result {
  hash: string;
  statement: {
    id: string;
  };
}

export default (config: Config) => {
  return async (opts: GetHashesOptions): Promise<StatementHash[]> => {
    const collection = (await config.db).collection('statements');

    const query = {
      'statement.id': { $in: opts.ids },
      ...matchesClientOption(opts.client)
    };
    const project = {
      _id: 0,
      'statement.id': 1,
      hash: 1,
    };
    const results = await collection.find(query).project(project).toArray() as Result[];

    return results.map((result) => {
      return {
        hash: result.hash,
        statementId: result.statement.id,
      };
    });
  };
};
