/// <reference types="lodash" />
import { Dictionary } from 'lodash';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import Config from '../../Config';
declare const _default: (config: Config, models: UnstoredStatementModel[]) => Promise<Dictionary<String[]>>;
export default _default;
