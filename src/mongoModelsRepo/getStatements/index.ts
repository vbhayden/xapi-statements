import StoredStatementModel from '../../models/StoredStatementModel';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import matchesClientOption from '../utils/matchesClientOption';
import { decodeDotsInStatement } from '../utils/replaceDotsInStatement';
import Config from '../Config';
import matchesAgentOption from './matchesAgentOption';
import matchesCursorOption from './matchesCursorOption';
import matchesVerbOption from './matchesVerbOption';
import matchesActivityOption from './matchesActivityOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesUntilOption from './matchesUntilOption';
import matchesSinceOption from './matchesSinceOption';
import { STATEMENTS_COLLECTION_NAME } from './../utils/constants';

const filterModels = (opts: GetStatementsOptions): Object => {
  return {
    $and: [
      { voided: false },
      matchesCursorOption(opts),
      matchesClientOption(opts.client, true),
      matchesAgentOption(opts),
      matchesVerbOption(opts),
      matchesActivityOption(opts),
      matchesRegistrationOption(opts),
      matchesUntilOption(opts),
      matchesSinceOption(opts),
    ]
  };
};

const sortModels = (ascending: boolean) => {
  return {
    stored: ascending ? 1 : -1,
    _id: -1,
  };
};

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StoredStatementModel[]> => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
    const query = filterModels(opts);
    const sort = sortModels(opts.ascending);
    const skip = opts.skip || 0;
    const limit = opts.limit;

    const models = await collection
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray() as StoredStatementModel[];

    const decodedModels = models.map((model) => {
      const statement = decodeDotsInStatement(model.statement);
      return { ...model, statement };
    });

    return decodedModels;
  };
};
