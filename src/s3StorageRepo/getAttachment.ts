import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<NodeJS.ReadableStream> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    const filePath = `${attachmentsDirectory}/${opts.hash}`;
    const stream = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).createReadStream();
    return stream;
  };
};
