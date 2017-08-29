import GetFullActivityOptions from '../repoFactory/options/GetFullActivityOptions';
import GetFullActivityResult from '../repoFactory/results/GetFullActivityResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetFullActivityOptions) => Promise<GetFullActivityResult>;
export default _default;
