import * as fs from 'fs-extra';
import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import GetAttachmentResult from '../repoFactory/results/GetAttachmentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<GetAttachmentResult> => {
    const attachmentsDirectory = `${config.storageDir}/attachments`;
    const filePath = `${attachmentsDirectory}/${opts.hash}`;
    const isExisting = await fs.pathExists(filePath);
    if (isExisting === false) {
      throw new Error(`Missing attachment file path ${filePath}`);
    }
    const stream = fs.createReadStream(filePath);
    const stats = await fs.stat(filePath);
    const contentLength = stats.size;
    return { stream, contentLength };
  };
};
