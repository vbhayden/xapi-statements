import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';

export default async (config: Config, statements: UnstoredStatementModel[]): Promise<void> => {
  if (!config.enableStatementCreation) return;
  await config.repo.createStatements({
    models: statements,
  });
};
