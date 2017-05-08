import { difference } from 'lodash';
import StatementModel from '../../models/StatementModel';
import AttachmentModel from '../../models/AttachmentModel';
import MissingAttachments from '../../errors/MissingAttachments';
import getAttachmentHashes from '../utils/getAttachmentHashes';
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
  const statementHashes = getAttachmentHashes(statements);
  const missingHashes = difference(statementHashes, attachmentHashes);

  if (missingHashes.length > 0) {
    throw new MissingAttachments(missingHashes);
  }
};
