import AttachmentResult from '../models/AttachmentResult';
import GetStatementsOptions from './options/GetStatementsOptions';
import Config from './Config';
import getStatements from './utils/getStatements';
import getAttachmentHashes from './utils/getAttachmentHashes';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<AttachmentResult> => {
    const models = await getStatements(config)(opts);
    const hashes = getAttachmentHashes(models);
    const attachments = await config.repo.getAttachments({ hashes });
    const statements = models.map((model) => {
      return model.statement;
    });
    return { attachments, statements };
  };
};
