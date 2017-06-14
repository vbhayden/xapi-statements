import AttachmentModel from '../models/AttachmentModel';
import GetAttachmentsOptions from '../repo/GetAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentsOptions): Promise<AttachmentModel[]> => {
    const filteredModels = await (await config.db).collection('attachments').find({
      hash: { $in: opts.hashes }
    }).toArray() as AttachmentModel[];
    return filteredModels;
  };
};
