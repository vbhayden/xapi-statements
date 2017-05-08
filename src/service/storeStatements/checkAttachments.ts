import { union, difference } from 'lodash';
import StatementModel from '../../models/StatementModel';
import AttachmentModel from '../../models/AttachmentModel';
import MissingAttachments from '../../errors/MissingAttachments';
import Config from '../Config';

export default async (
  config: Config,
  statements: StatementModel[],
  attachments: AttachmentModel[],
): Promise<void> => {
  if (!config.enableAttachmentValidation) return;
  const attachmentHashes = attachments.map((attachment) => {
    return attachment.hash;
  });
  const statementHashes = statements.reduce((carriedHashes: string[], model) => {
    const attachments = model.statement.attachments;
    if (attachments === undefined) return carriedHashes;

    const statementShas = attachments.filter((attachment) => {
      return attachment.fileUrl === undefined;
    }).map((attachment) => {
      return attachment.sha2;
    });

    return union(carriedHashes, statementShas);
  }, [] as string[]);

  const missingHashes = difference(statementHashes, attachmentHashes);

  if (missingHashes.length > 0) {
    throw new MissingAttachments(missingHashes);
  }
};
