import StatementModel from '../../models/StatementModel';
import Config from '../Config';

export default async (
  config: Config,
  _statements: StatementModel[]
): Promise<void> => {
  if (!config.enableReferencing) return;
};
