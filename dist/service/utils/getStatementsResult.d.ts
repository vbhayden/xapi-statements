import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import StatementsResult from '../../models/StatementsResult';
import StatementsResultOptions from '../../serviceFactory/options/StatementsResultOptions';
import Config from '../Config';
declare const _default: (config: Config, opts: StatementsResultOptions, models: UnstoredStatementModel[]) => Promise<StatementsResult>;
export default _default;
