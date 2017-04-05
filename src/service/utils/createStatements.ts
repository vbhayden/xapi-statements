import StatementModel from '../../models/StatementModel';
import Config from '../Config';

export default async (config: Config, statements: StatementModel[]): Promise<void> => {
  if (!config.enableStatementCreation) return;
  config.repo.createStatements({
    models: statements,
  });
};
