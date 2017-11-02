import * as fs from 'fs-extra';
import Signature, { Opts } from './Signature';
import Config from '../utils/localStorage/Config';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';

export default (config: Config): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.storageDir, lrs_id });
    await fs.ensureDir(dir);
    const promises = models.map((model) => {
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
