import { S3 } from 'aws-sdk';
import Config from './Config';

export default (config: Config) => {
  const listObjects = (params: S3.ListObjectsRequest): Promise<S3.ListObjectsOutput> => {
    return new Promise((resolve, reject) => {
      config.client.listObjects(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  };

  const deleteObjects = (params: S3.DeleteObjectsRequest): Promise<S3.DeleteObjectsOutput> => {
    return new Promise((resolve, reject) => {
      config.client.deleteObjects(params, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  };

  return async (): Promise<void> => {
    const listObjectsOutput = await listObjects({
      Bucket: config.bucketName,
      Prefix: config.subFolder,
    });
    const objects = (listObjectsOutput.Contents || []);
    const identifiers: S3.ObjectIdentifierList = objects.reduce(
      (identifiers, { Key }) => {
        if (Key !== undefined) {
          return [...identifiers, { Key }];
        }
        return identifiers;
      }
    , [] as S3.ObjectIdentifierList);

    if (identifiers.length !== 0) {
      await deleteObjects({
        Bucket: config.bucketName,
        Delete: { Objects: identifiers },
      });
    }
  };
};
