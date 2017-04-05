import StatementModel from '../../models/StatementModel';
import Config from '../Config';

export default async (
  config: Config,
  statements: StatementModel[],
  voidedObjectIds: string[]
): Promise<void> => {
  if (!config.enableVoiding) return;
  const statementIds = statements.map((model) => {
    return model.statement.id;
  });
  const voidersForStatementIds = await config.repo.getVoidersByObjectIds({
    ids: statementIds,
  });
  const idsToBeVoided: string[] = [
    ...voidedObjectIds,
    ...voidersForStatementIds,
  ];
  await config.repo.voidStatements({
    ids: idsToBeVoided,
  });
};
