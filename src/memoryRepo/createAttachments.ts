import AttachmentModel from '../models/AttachmentModel';
import CreateAttachmentsOptions from '../repo/CreateAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<AttachmentModel[]> => {
    config.state.attachments = config.state.attachments.concat(opts.models);
    return opts.models;
  };
};
