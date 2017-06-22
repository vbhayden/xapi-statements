import AttachmentModel from '../models/AttachmentModel';
import GetAttachmentsOptions from '../repo/GetAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetAttachmentsOptions): Promise<AttachmentModel[]> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    return opts.hashes.map((hash): AttachmentModel => {
      const filePath = `${attachmentsDirectory}/${hash}`;
      const result = config.client.getObject({
        Bucket: config.bucketName,
        Key: filePath,
      });
      const stream = result.createReadStream();
      return { stream, hash };
    });
  };
};
