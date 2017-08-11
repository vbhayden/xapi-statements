/// <reference types="lodash" />
import { Dictionary } from 'lodash';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import Statement from '../../../models/Statement';
import Config from '../../Config';
declare const _default: (config: Config, models: UnstoredStatementModel[]) => Promise<Dictionary<Statement>>;
export default _default;
