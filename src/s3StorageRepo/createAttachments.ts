import upload from 'jscommons/dist/s3Repo/utils/upload';
import CreateAttachmentsOptions from '../repo/CreateAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<void> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    const promises = opts.models.map((model) => {
      const filePath = `${attachmentsDirectory}/${model.hash}`;
      return upload(config.client, {
        Bucket: config.bucketName,
        Body: model.stream,
        Key: filePath,
      });
    });
    await Promise.all(promises);
  };
};
