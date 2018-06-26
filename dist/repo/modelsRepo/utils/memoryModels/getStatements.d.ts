import Statement from '../../../../models/Statement';
import ClientModel from '../../../../models/ClientModel';
import FacadeConfig from './FacadeConfig';
export interface Options<Result> {
    config: FacadeConfig;
    query: (model: Statement) => boolean;
    project: (model: Statement) => Result;
    client: ClientModel;
}
declare const _default: <Result>({ config, query, project, client }: Options<Result>) => Promise<Result[]>;
export default _default;
