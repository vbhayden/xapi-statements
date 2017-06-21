import * as fs from 'fs-extra';
import AttachmentModel from '../models/AttachmentModel';
import GetAttachmentsOptions from '../repo/GetAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentsOptions): Promise<AttachmentModel[]> => {
    return opts.hashes.map((hash): AttachmentModel => {
      const filePath = `${config.attachmentsDirectory}/${hash}`;
      const stream = fs.createReadStream(filePath);
      return { stream, hash };
    });
  };
};
