import StatementModel from '../models/StatementModel';
import GetDownRefIdOptions from '../repo/GetDownRefIdOptions';
import NoModel from '../errors/NoModel';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetDownRefIdOptions): Promise<string> => {
    const collection = (await config.db).collection('statements');
    const filteredModel = await collection.findOne({
      'statement.object.objectType': 'StatementRef',
      'statement.id': opts.id,
    }) as StatementModel|null;

    if (filteredModel === null) {
      throw new NoModel('Statement');
    }

    const statementObject = filteredModel.statement.object;
    if (statementObject.objectType === 'StatementRef') {
      return statementObject.id;
    }
    throw new Error('No longer a StatementRef.');
  };
};
