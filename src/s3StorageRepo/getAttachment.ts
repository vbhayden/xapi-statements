import GetAttachmentOptions from '../repo/GetAttachmentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<NodeJS.ReadableStream> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    const filePath = `${attachmentsDirectory}/${opts.hash}`;
    const result = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    });
    const stream = result.createReadStream();
    return stream;
  };
};
