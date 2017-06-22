import StatementModel from '../../models/StatementModel';
import getAttachmentHashes from '../utils/getAttachmentHashes';
import Config from '../Config';

export default async (
  config: Config,
  models: StatementModel[],
  hasAttachments: boolean
) => {
  if (hasAttachments) {
    const hashes = getAttachmentHashes(models);
    return config.repo.getAttachments({ hashes });
  }

  return [];
};
