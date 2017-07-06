import { map, difference } from 'lodash';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import AttachmentModel from '../../models/AttachmentModel';
import MissingAttachments from '../../errors/MissingAttachments';
import getAttachmentHashes from '../utils/getAttachmentHashes';
import Config from '../Config';

export default async (
  config: Config,
  statements: UnstoredStatementModel[],
  attachments: AttachmentModel[],
): Promise<void> => {
  /* istanbul ignore next */
  if (!config.enableAttachmentValidation) return;

  const attachmentHashes = attachments.map((attachment) => {
    return attachment.hash;
  });
  const statementHashes = map(getAttachmentHashes(statements), (attachment) => {
    return attachment.sha2;
  });
  const missingHashes = difference(statementHashes, attachmentHashes);

  if (missingHashes.length > 0) {
    throw new MissingAttachments(missingHashes);
  }
};
