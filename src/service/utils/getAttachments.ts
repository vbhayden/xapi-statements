import AttachmentModel from '../../models/AttachmentModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import getStatementsAttachments from '../utils/getStatementsAttachments';
import Config from '../Config';
import { filter } from 'bluebird';

export default async (
  config: Config,
  models: UnstoredStatementModel[],
  hasAttachments: boolean
): Promise<AttachmentModel[]> => {
  if (!hasAttachments) {
    return [];
  }

  const attachments = getStatementsAttachments(models);
  const potentialAttachments = attachments.map((attachment) => {
    return {
      fileUrl: attachment.fileUrl,
      hash: attachment.sha2,
      streamPromise: config.repo.getAttachment({ hash: attachment.sha2 }),
      contentType: attachment.contentType,
    };
  });
  const storedAttachments = await filter(potentialAttachments, async (potentialAttachment) => {
    try {
      await potentialAttachment.streamPromise;
      return true;
    } catch (err) {
      if (potentialAttachment.fileUrl === undefined) {
        /* istanbul ignore next - only happens if a file incorrectly goes missing */
        throw err;
      }
      return false;
    }
  });
  const streamedAttachments = storedAttachments.map(async (storedAttachment) => {
    return {
      hash: storedAttachment.hash,
      stream: await storedAttachment.streamPromise,
      contentType: storedAttachment.contentType,
    };
  });
  const awaitedAttachments = await Promise.all(streamedAttachments);
  return awaitedAttachments;
};
