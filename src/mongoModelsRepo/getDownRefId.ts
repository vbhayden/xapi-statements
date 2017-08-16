import NoModel from 'jscommons/dist/errors/NoModel';
import GetDownRefIdOptions from '../repoFactory/options/GetDownRefIdOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

interface Result {
  statement: {
    object: {
      id: string;
    }
  };
};

export default (config: Config) => {
  return async (opts: GetDownRefIdOptions): Promise<string> => {
    const collection = (await config.db).collection('statements');

    const query = {
      'statement.object.objectType': 'StatementRef',
      'statement.id': opts.id,
      ...matchesClientOption(opts.client)
    };
    const queryOptions = {
      fields: {
        _id: 0,
        'statement.object.id': 1,
      }
    };
    const result = await collection.findOne(query, queryOptions) as Result | null;

    if (result === null) {
      throw new NoModel('Statement');
    }

    return result.statement.object.id;
  };
};
