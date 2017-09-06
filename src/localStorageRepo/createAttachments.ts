import * as fs from 'fs-extra';
import CreateAttachmentsOptions from '../repoFactory/options/CreateAttachmentsOptions';
import Config from './Config';
import getAttachmentDir from '../utils/getAttachmentDir';
import getAttachmentPath from '../utils/getAttachmentPath';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<void> => {
    const dir = getAttachmentDir({ subfolder: config.storageDir, lrs_id: opts.lrs_id });
    await fs.ensureDir(dir);
    const promises = opts.models.map((model) => {
      return new Promise((resolve, reject) => {
        const filePath = getAttachmentPath({
          dir,
          hash: model.hash,
          contentType: model.contentType
        });
        const writeStream = fs.createWriteStream(filePath);
        model.stream.pipe(writeStream);
        model.stream.on('end', () => {
          resolve(filePath);
        });
        model.stream.on('error', (err: any) => {
          /* istanbul ignore next */
          reject(err);
        });
      });
    });
    await Promise.all(promises);
  };
};
