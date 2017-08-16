import Config from '../Config';
import ClientModel from '../../models/ClientModel';
export interface Options {
    config: Config;
    query: Object;
    project: Object;
    client: ClientModel;
}
declare const _default: ({config, query, project, client}: Options) => Promise<any[]>;
export default _default;
