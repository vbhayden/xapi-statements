import GetDownRefIdOptions from '../repo/GetDownRefIdOptions';
import NoModel from '../errors/NoModel';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetDownRefIdOptions): Promise<string> => {
    const collection = (await config.db).collection('statements');
    const result = await collection.findOne({
      'statement.object.objectType': 'StatementRef',
      'statement.id': opts.id,
    }, {
      fields: {
        _id: 0,
        'value': '$statement.object.id',
      }
    }) as { value: string }|null;

    if (result === null) {
      throw new NoModel('Statement');
    }

    return result.value;
  };
};
