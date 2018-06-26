import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Opts {
    readonly config: Config;
    readonly models: UnstoredStatementModel[];
    readonly client: ClientModel;
}
declare const _default: ({ config, models, client }: Opts) => Promise<void>;
export default _default;
