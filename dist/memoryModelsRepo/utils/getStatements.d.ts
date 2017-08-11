import Statement from '../../models/Statement';
import Config from '../Config';
export interface Options<Result> {
    config: Config;
    query: (model: Statement) => boolean;
    project: (model: Statement) => Result;
}
declare const _default: <Result>({config, query, project}: Options<Result>) => Promise<Result[]>;
export default _default;
