import { Dictionary } from 'lodash';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import ClientModel from '../../../models/ClientModel';
import Statement from '../../../models/Statement';
import Config from '../../Config';
declare const _default: (config: Config, models: UnstoredStatementModel[], client: ClientModel) => Promise<Dictionary<Statement>>;
export default _default;
