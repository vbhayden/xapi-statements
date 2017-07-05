import NoModel from 'jscommons/dist/errors/NoModel';
import StoredStatementModel from '../models/StoredStatementModel';
import GetStatementOptions from '../repo/GetStatementOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StoredStatementModel> => {
    const collection = (await config.db).collection('statements');
    const filteredModel = await collection.findOne({
      'statement.id': opts.id,
      ...matchesClientOption(opts.client),
      ...(
        opts.voided === undefined ? {} :
          { voided: opts.voided }
      ),
    }) as StoredStatementModel;

    if (filteredModel === null) {
      throw new NoModel('Statement');
    }

    return filteredModel;
  };
};
