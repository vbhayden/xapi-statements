import ClientModel from '../../../../models/ClientModel';
import FacadeConfig from './FacadeConfig';
export interface Options {
    config: FacadeConfig;
    query: Object;
    project: Object;
    client: ClientModel;
}
declare const _default: ({ config, query, project, client }: Options) => Promise<any[]>;
export default _default;
