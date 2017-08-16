import Config from '../Config';
export interface Options {
    config: Config;
    query: Object;
    project: Object;
}
declare const _default: ({config, query, project}: Options) => Promise<any[]>;
export default _default;
