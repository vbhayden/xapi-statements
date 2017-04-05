import StatementModel from '../../models/StatementModel';
import AttachmentModel from '../../models/AttachmentModel';
import AttachmentError from '../../errors/AttachmentError';
import AttachmentHashError from '../../errors/AttachmentHashError';
import Config from '../Config';

export default async (
  config: Config,
  statements: StatementModel[],
  attachments: AttachmentModel[],
): Promise<void> => {
  if (!config.enableAttachmentValidation) return;
  const hashes = attachments.map((attachment) => {
    return attachment.hash;
  });
  const shas = statements.reduce((results: string[], model) => {
    const attachments = model.statement.attachments;
    if (attachments === undefined || attachments.length < 1) return results;

    return [...results, ...attachments.map((attachment) => {
      const hasNoExistingHash = !hashes.includes(attachment.sha2);
      const hasNoFileUrl = attachment.fileUrl === undefined;
      if (hasNoExistingHash && hasNoFileUrl) {
        throw new AttachmentError(attachment.sha2);
      }
      return attachment.sha2;
    })];
  }, []);
  hashes.forEach((hash) => {
    if (shas.includes(hash)) return;
    throw new AttachmentHashError(hash);
  });
};
