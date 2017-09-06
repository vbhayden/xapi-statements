import CreateAttachmentsOptions from '../repoFactory/options/CreateAttachmentsOptions';
import Config from './Config';
import getAttachmentDir from '../utils/getAttachmentDir';
import getAttachmentPath from '../utils/getAttachmentPath';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<void> => {
    const dir = getAttachmentDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const promises = opts.models.map((model) => {
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
