import CreateAttachmentsOptions from '../repoFactory/options/CreateAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: CreateAttachmentsOptions): Promise<void> => {
    const attachmentsDirectory = `${config.subFolder}/${opts.lrs_id}/attachments`;
    const promises = opts.models.map((model) => {
      const filePath = `${attachmentsDirectory}/${model.hash}`;
      return config.client.upload({
        Bucket: config.bucketName,
        Body: model.stream,
        Key: filePath,
      }).promise();
    });
    await Promise.all(promises);
  };
};
