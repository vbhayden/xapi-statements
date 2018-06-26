import { Dictionary } from 'lodash';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
declare const _default: (config: Config, models: UnstoredStatementModel[], client: ClientModel) => Promise<Dictionary<string[]>>;
export default _default;
