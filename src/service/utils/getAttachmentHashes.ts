import { union } from 'lodash';
import StatementModel from '../../models/StatementModel';
import StatementBase from '../../models/StatementBase';

const getStatementBaseHashes = (statement: StatementBase): string[] => {
  const attachments = statement.attachments;
  if (attachments === undefined) return [];

  const statementShas = attachments.filter((attachment) => {
    return attachment.fileUrl === undefined;
  }).map((attachment) => {
    return attachment.sha2;
  });

  return statementShas;
};

export default (models: StatementModel[]): string[] => {
  const statementHashes = models.reduce((carriedHashes: string[], model) => {
    const statementShas = getStatementBaseHashes(model.statement);
    const subStatementShas = (
      model.statement.object.objectType === 'SubStatement' ?
      getStatementBaseHashes(model.statement.object) :
      []
    );

    return union(carriedHashes, statementShas, subStatementShas);
  }, [] as string[]);
  return statementHashes;
};
