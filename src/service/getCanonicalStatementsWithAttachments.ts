import AttachmentResult from '../models/AttachmentResult';
import GetCanonicalStatementsOptions from './options/GetCanonicalStatementsOptions';
import Config from './Config';
import getStatements from './utils/getStatements';
import formatStatement from './utils/canonicalFormat/statement';
import getAttachmentHashes from './utils/getAttachmentHashes';

export default (config: Config) => {
  return async (opts: GetCanonicalStatementsOptions): Promise<AttachmentResult> => {
    const models = await getStatements(config)(opts);
    const hashes = getAttachmentHashes(models);
    const attachments = await config.repo.getAttachments({ hashes });
    const statements = models.map((model) => {
      return formatStatement(model.statement, opts.langs);
    });
    return { attachments, statements };
  };
};
