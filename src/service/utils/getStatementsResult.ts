import StatementModel from '../../models/StatementModel';
import StatementsResult from '../../models/StatementsResult';
import StatementsResultOptions from '../options/StatementsResultOptions';
import getAttachments from '../utils/getAttachments';
import formatStatements from '../utils/formatStatements';
import Config from '../Config';

export default async (
  config: Config,
  opts: StatementsResultOptions,
  models: StatementModel[]
): Promise<StatementsResult> => {
  const attachmentsOpt = opts.attachments || false;
  const formatOpt = opts.format || 'exact';
  const langsOpt = opts.langs || [];
  const attachments = await getAttachments(config, models, attachmentsOpt);
  const statements = formatStatements(models, formatOpt, langsOpt);
  return { statements, attachments };
};
