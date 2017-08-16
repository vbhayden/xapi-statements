import UpRef from '../models/UpRef';
import GetUpRefsByIdsOptions from '../repoFactory/options/GetUpRefsByIdsOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetUpRefsByIdsOptions) => Promise<UpRef[]>;
export default _default;
