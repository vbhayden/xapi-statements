import UpRef from '../models/UpRef';
import GetUpRefsByIdsOptions from '../repoFactory/options/GetUpRefsByIdsOptions';
import matchesClientOption from './utils/matchesClientOption';
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
    
    const query = {
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': { $in: opts.targetIds },
      ...matchesClientOption(opts.client)
    };

    const project = {
      _id: 0,
      'statement.id': 1,
      'statement.object.id': 1,
    }

    const results = await collection.find(query).project(project).toArray() as Result[];

    return results.map((result) => {
      return {
        sourceId: result.statement.id,
        targetId: result.statement.object.id,
      };
    });
  };
};
