import download from 'jscommons/dist/s3Repo/utils/download';
import GetAttachmentOptions from '../repo/GetAttachmentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<NodeJS.ReadableStream> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    const filePath = `${attachmentsDirectory}/${opts.hash}`;
    const stream = download(config.client, {
      Bucket: config.bucketName,
      Key: filePath,
    });
    return stream;
  };
};
