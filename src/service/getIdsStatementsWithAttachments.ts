import IdFormattedAttachmentResult from '../models/IdFormattedAttachmentResult';
import GetStatementsOptions from './options/GetStatementsOptions';
import Config from './Config';
import getStatements from './utils/getStatements';
import formatStatement from './utils/idsFormat/statement';
import getAttachmentHashes from './utils/getAttachmentHashes';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<IdFormattedAttachmentResult> => {
    const models = await getStatements(config)(opts);
    const hashes = getAttachmentHashes(models);
    const attachments = await config.repo.getAttachments({ hashes });
    const statements = models.map((model) => {
      return formatStatement(model.statement);
    });
    return { attachments, statements };
  };
};
