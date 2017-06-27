import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import getAttachmentHashes from '../utils/getAttachmentHashes';
import Config from '../Config';

export default async (
  config: Config,
  models: UnstoredStatementModel[],
  hasAttachments: boolean
) => {
  if (hasAttachments) {
    const hashes = getAttachmentHashes(models);
    return config.repo.getAttachments({ hashes });
  }

  return [];
};
