import Statement from '../../models/Statement';
import Config from '../Config';
import ClientModel from '../../models/ClientModel';
export interface Options<Result> {
    config: Config;
    query: (model: Statement) => boolean;
    project: (model: Statement) => Result;
    client: ClientModel;
}
declare const _default: <Result>({config, query, project, client}: Options<Result>) => Promise<Result[]>;
export default _default;
