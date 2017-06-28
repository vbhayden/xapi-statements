import { map } from 'lodash';
import AttachmentModel from '../../models/AttachmentModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import getAttachmentHashes from '../utils/getAttachmentHashes';
import Config from '../Config';

export default async (
  config: Config,
  models: UnstoredStatementModel[],
  hasAttachments: boolean
): Promise<AttachmentModel[]> => {
  if (hasAttachments) {
    const attachmentsMap = getAttachmentHashes(models);
    const streamedAttachments = map(attachmentsMap, async (attachment) => {
      return {
        hash: attachment.sha2,
        stream: await config.repo.getAttachment({ hash: attachment.sha2 }),
        contentType: attachment.contentType,
      };
    });
    return Promise.all(streamedAttachments);
  }

  return [];
};
