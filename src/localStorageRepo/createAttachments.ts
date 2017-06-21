import AttachmentModel from '../models/AttachmentModel';
import CreateAttachmentsOptions from '../repo/CreateAttachmentsOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<AttachmentModel[]> => {
    return opts.models;
  };
};
