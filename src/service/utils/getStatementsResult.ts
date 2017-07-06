import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import StatementsResult from '../../models/StatementsResult';
import StatementsResultOptions from '../../serviceFactory/options/StatementsResultOptions';
import getAttachments from '../utils/getAttachments';
import formatStatements from '../utils/formatStatements';
import Config from '../Config';

export default async (
  config: Config,
  opts: StatementsResultOptions,
  models: UnstoredStatementModel[]
): Promise<StatementsResult> => {
  const attachmentsOpt = opts.attachments || false;
  const formatOpt = opts.format || 'exact';
  const langsOpt = opts.langs || [];
  const attachments = await getAttachments(config, models, attachmentsOpt);
  const statements = formatStatements(models, formatOpt, langsOpt);
  return { statements, attachments };
};
