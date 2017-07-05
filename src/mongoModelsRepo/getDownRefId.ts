import NoModel from 'jscommons/dist/errors/NoModel';
import GetDownRefIdOptions from '../repo/GetDownRefIdOptions';
import Config from './Config';

interface Result {
  statement: {
    object: {
      id: string;
    }
  }
};

export default (config: Config) => {
  return async (opts: GetDownRefIdOptions): Promise<string> => {
    const collection = (await config.db).collection('statements');
    const result = await collection.findOne({
      'statement.object.objectType': 'StatementRef',
      'statement.id': opts.id,
    }, {
        fields: {
          _id: 0,
          'statement.object.id': 1,
        }
      }) as Result | null;

    if (result === null) {
      throw new NoModel('Statement');
    }

    return result.statement.object.id;
  };
};
