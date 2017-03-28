import StatementModel from '../models/StatementModel';
import GetStatementsOptions from '../repo/GetStatementsOptions';
import matchesAgentOption from './utils/matchesAgentOption';
import matchesVerbOption from './utils/matchesVerbOption';
import matchesActivityOption from './utils/matchesActivityOption';
import matchesRegistrationOption from './utils/matchesRegistrationOption';
import matchesUntilOption from './utils/matchesUntilOption';
import matchesSinceOption from './utils/matchesSinceOption';
import Config from './Config';

const filterModels = (models: StatementModel[], opts: GetStatementsOptions) => {
  return models.filter((model: StatementModel) => {
    const statement = model.statement;
    return (
      matchesAgentOption(statement, opts) &&
      matchesVerbOption(statement, opts) &&
      matchesActivityOption(statement, opts) &&
      matchesRegistrationOption(statement, opts) &&
      matchesUntilOption(statement, opts) &&
      matchesSinceOption(statement, opts)
    );
  });
};

const sortModels = (models: StatementModel[], ascending: boolean) => {
  const lower = ascending ? -1 : 1;
  const higher = ascending ? 1 : -1;
  return models.sort((itemA, itemB) => {
    const storedA = itemA.statement.stored;
    const storedB = itemB.statement.stored;
    if (storedA < storedB) return lower;
    if (storedA > storedB) return higher;
    return 0;
  });
};

const limitModels = (models: StatementModel[], limit?: number) => {
  return models.slice(0, limit);
};

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementModel[]> => {
    const filteredItems = filterModels(config.state.statements, opts);
    const sortedItems = sortModels(filteredItems, opts.ascending);
    const limitedItems = limitModels(sortedItems, opts.limit);
    return limitedItems;
  };
};
