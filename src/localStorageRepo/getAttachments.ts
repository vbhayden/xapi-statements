import AttachmentModel from '../models/AttachmentModel';
import GetAttachmentsOptions from '../repo/GetAttachmentsOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: GetAttachmentsOptions): Promise<AttachmentModel[]> => {
    return [];
  };
};
