import { union } from 'lodash';
import StatementModel from '../../models/StatementModel';

export default (models: StatementModel[]): string[] => {
  const statementHashes = models.reduce((carriedHashes: string[], model) => {
    const attachments = model.statement.attachments;
    if (attachments === undefined) return carriedHashes;

    const statementShas = attachments.filter((attachment) => {
      return attachment.fileUrl === undefined;
    }).map((attachment) => {
      return attachment.sha2;
    });

    return union(carriedHashes, statementShas);
  }, [] as string[]);
  return statementHashes;
};
