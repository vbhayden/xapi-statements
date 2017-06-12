import StatementModel from '../../models/StatementModel';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import Config from '../Config';
import matchesClientOption from './matchesClientOption';
import matchesAgentOption from './matchesAgentOption';
import matchesVerbOption from './matchesVerbOption';
import matchesActivityOption from './matchesActivityOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesUntilOption from './matchesUntilOption';
import matchesSinceOption from './matchesSinceOption';

const filterModels = (models: StatementModel[], opts: GetStatementsOptions) => {
  return models.filter((model: StatementModel) => {
    const statement = model.statement;
    return (
      matchesClientOption(model, opts) &&
      matchesAgentOption(model, opts) &&
      matchesVerbOption(model, opts) &&
      matchesActivityOption(model, opts) &&
      matchesRegistrationOption(model, opts) &&
      matchesUntilOption(statement, opts) &&
      matchesSinceOption(statement, opts)
    );
  });
};

const sortModels = (models: StatementModel[], ascending: boolean) => {
  const lower = ascending ? -1 : 1;
  const higher = ascending ? 1 : -1;
  return models.sort((modelA, modelB) => {
    const storedA = modelA.statement.stored;
    const storedB = modelB.statement.stored;
    if (storedA < storedB) return lower;
    if (storedA > storedB) return higher;
    return 0;
  });
};

const limitModels = (
  models: StatementModel[],
  skip: number = 0,
  limit: number = models.length
) => {
  return models.slice(skip, limit + skip);
};

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementModel[]> => {
    const filteredItems = filterModels(config.state.statements, opts);
    const sortedItems = sortModels(filteredItems, opts.ascending);
    const limitedItems = limitModels(sortedItems, opts.skip, opts.limit);
    return limitedItems;
  };
};
