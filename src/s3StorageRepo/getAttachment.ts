import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import GetAttachmentResult from '../repoFactory/results/GetAttachmentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<GetAttachmentResult> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    const filePath = `${attachmentsDirectory}/${opts.hash}`;
    const s3ObjectRequest = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    });
    const s3Object = await s3ObjectRequest.promise();
    const contentLength = s3Object.ContentLength;
    const stream = s3ObjectRequest.createReadStream();
    return { stream, contentLength };
  };
};
