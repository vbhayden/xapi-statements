import Signature, { Opts } from './Signature';
import Config from '../utils/s3Storage/Config';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';

export default (config: Config): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const promises = models.map((model) => {
      const filePath = getAttachmentPath({
        dir,
        hash: model.hash,
        contentType: model.contentType
      });
      return config.client.upload({
        Bucket: config.bucketName,
        Body: model.stream,
        Key: filePath,
      }).promise();
    });
    await Promise.all(promises);
  };
};
