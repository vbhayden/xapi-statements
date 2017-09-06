import * as fs from 'fs-extra';
import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import GetAttachmentResult from '../repoFactory/results/GetAttachmentResult';
import getAttachmentDir from '../utils/getAttachmentDir';
import getAttachmentPath from '../utils/getAttachmentPath';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<GetAttachmentResult> => {
    const dir = getAttachmentDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    const filePath = getAttachmentPath({
      dir,
      hash: opts.hash,
      contentType: opts.contentType
    });
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
