/// <reference types="lodash" />
import { Dictionary } from 'lodash';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
declare const _default: (config: Config, models: UnstoredStatementModel[], client: ClientModel) => Promise<Dictionary<String[]>>;
export default _default;
