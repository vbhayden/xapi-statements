/// <reference types="node" />
import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetAttachmentOptions) => Promise<NodeJS.ReadableStream>;
export default _default;
