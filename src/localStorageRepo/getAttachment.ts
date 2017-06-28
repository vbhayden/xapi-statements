import * as fs from 'fs-extra';
import GetAttachmentOptions from '../repo/GetAttachmentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<NodeJS.ReadableStream> => {
    const attachmentsDirectory = `${config.storageDir}/attachments`;
    const filePath = `${attachmentsDirectory}/${opts.hash}`;
    const stream = fs.createReadStream(filePath);
    return stream;
  };
};
