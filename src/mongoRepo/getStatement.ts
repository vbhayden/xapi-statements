import StatementModel from '../models/StatementModel';
import GetStatementOptions from '../repo/GetStatementOptions';
import NoModel from '../errors/NoModel';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StatementModel> => {
    const collection = (await config.db).collection('statements');
    const filteredModel = await collection.findOne({
      'statement.id': opts.id,
      ...matchesClientOption(opts.client),
      ...(
        opts.voided === undefined ? {} :
        { voided: opts.voided }
      ),
    }) as StatementModel;

    if (filteredModel === null) {
      throw new NoModel('Statement');
    }

    return filteredModel;
  };
};
