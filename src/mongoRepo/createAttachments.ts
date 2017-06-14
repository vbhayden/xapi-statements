import AttachmentModel from '../models/AttachmentModel';
import CreateAttachmentsOptions from '../repo/CreateAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<AttachmentModel[]> => {
    if (opts.models.length === 0) return opts.models;

    const collection = (await config.db).collection('attachments');
    await collection.insertMany(opts.models);
    return opts.models;
  };
};
