import GetVoidersOptions from '../../repoFactory/options/GetVoidersOptions';
import Config from '../Config';
export interface Options extends GetVoidersOptions {
    config: Config;
    searchKey: string;
}
declare const _default: ({config, searchKey, ids}: Options) => Promise<any[]>;
export default _default;
