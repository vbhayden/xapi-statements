import StatementModel from '../../models/StatementModel';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import matchesClientOption from '../utils/matchesClientOption';
import Config from '../Config';
import matchesAgentOption from './matchesAgentOption';
import matchesVerbOption from './matchesVerbOption';
import matchesActivityOption from './matchesActivityOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesUntilOption from './matchesUntilOption';
import matchesSinceOption from './matchesSinceOption';

const filterModels = (opts: GetStatementsOptions): Object => {
  return {
    voided: false,
    ...matchesClientOption(opts.client),
    ...matchesAgentOption(opts),
    ...matchesVerbOption(opts),
    ...matchesActivityOption(opts),
    ...matchesRegistrationOption(opts),
    ...matchesUntilOption(opts),
    ...matchesSinceOption(opts),
  };
};

const sortModels = (ascending: boolean) => {
  return {
    'statement.stored': ascending ? 1 : -1,
  };
};

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementModel[]> => {
    const collection = (await config.db).collection('statements');
    const query = filterModels(opts);
    const sort = sortModels(opts.ascending);
    const skip = opts.skip || 0;
    const limit = opts.limit || 0;

    const models = await collection
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray() as StatementModel[];

    return models;
  };
};
