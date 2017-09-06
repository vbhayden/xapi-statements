import GetAttachmentOptions from '../repoFactory/options/GetAttachmentOptions';
import GetAttachmentResult from '../repoFactory/results/GetAttachmentResult';
import getAttachmentDir from '../utils/getAttachmentDir';
import getAttachmentPath from '../utils/getAttachmentPath';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentOptions): Promise<GetAttachmentResult> => {
    const dir = getAttachmentDir({ subfolder: config.subFolder, lrs_id: opts.lrs_id });
    const filePath = getAttachmentPath({
      dir,
      hash: opts.hash,
      contentType: opts.contentType
    });
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
