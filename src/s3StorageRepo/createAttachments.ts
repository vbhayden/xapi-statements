import { S3 } from 'aws-sdk';
import AttachmentModel from '../models/AttachmentModel';
import CreateAttachmentsOptions from '../repo/CreateAttachmentsOptions';
import Config from './Config';

export default (config: Config) => {
  const upload = (params: S3.PutObjectRequest): Promise<S3.PutObjectOutput> => {
    return new Promise((resolve, reject) => {
      config.client.upload(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  };

  return async (opts: CreateAttachmentsOptions): Promise<AttachmentModel[]> => {
    const attachmentsDirectory = `${config.subFolder}/attachments`;
    const promises = opts.models.map((model) => {
      const filePath = `${attachmentsDirectory}/${model.hash}`;
      return upload({
        Bucket: config.bucketName,
        Body: model.stream,
        Key: filePath,
      });
    });
    await Promise.all(promises);
    return opts.models;
  };
};
