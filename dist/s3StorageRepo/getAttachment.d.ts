import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import GetAttachmentResult from '../repoFactory/results/GetAttachmentResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetAttachmentOptions) => Promise<GetAttachmentResult>;
export default _default;
