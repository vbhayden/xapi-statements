import { includes } from 'lodash';
import AttachmentModel from '../models/AttachmentModel';
import GetAttachmentsOptions from '../repo/GetAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentsOptions): Promise<AttachmentModel[]> => {
    const filteredModels = config.state.attachments.filter((model) => {
      return (
        includes(opts.hashes, model.hash)
      );
    });
    return filteredModels;
  };
};
