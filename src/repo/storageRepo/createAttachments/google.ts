import * as fs from 'fs-extra';
import Signature, { Opts } from './Signature';
import FacadeConfig from '../utils/googleStorage/FacadeConfig';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });

    const promises = models.map((model) => {
      return new Promise((resolve, reject) => {
        const filePath = getAttachmentPath({
          dir,
          hash: model.hash,
          contentType: model.contentType
        });
        const file = config.storage.bucket(config.bucketName).file(filePath);
        const writeStream = file.createWriteStream();
        model.stream.pipe(writeStream);
        writeStream.on('finish', () => {
          resolve();
        });
        model.stream.on('error', reject);
        writeStream.on('error', reject);
      });
    });

    await Promise.all(promises);
  };
};
