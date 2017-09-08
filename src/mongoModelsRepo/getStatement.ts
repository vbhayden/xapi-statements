import NoModel from 'jscommons/dist/errors/NoModel';
import StoredStatementModel from '../models/StoredStatementModel';
import GetStatementOptions from '../repoFactory/options/GetStatementOptions';
import matchesClientOption from './utils/matchesClientOption';
import { decodeDotsInStatement } from './utils/replaceDotsInStatement';
import Config from './Config';
import { STATEMENTS_COLLECTION_NAME } from './utils/constants';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StoredStatementModel> => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
    const query = {
      'statement.id': opts.id,
      ...matchesClientOption(opts.client, true),
      ...(
        opts.voided === undefined ? {} :
          { voided: opts.voided }
      ),
    };

    const filteredModel = await collection.findOne(query) as StoredStatementModel;

    if (filteredModel === null) {
      throw new NoModel('Statement');
    }

    const decodedModel = {
      ...filteredModel,
      statement: decodeDotsInStatement(filteredModel.statement),
    };
    return decodedModel;
  };
};
