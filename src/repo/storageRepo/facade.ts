import * as S3 from 'aws-sdk/clients/s3';
import localStorageRepo from './utils/localStorage/facade';
import s3StorageRepo from './utils/s3Storage/facade';
import Repo from './Repo';
import Config from './Config';

export default (config: Config): Repo => {
  switch (config.facade) {
    case 's3':
      return s3StorageRepo({
        client: new S3(config.s3.awsConfig),
        bucketName: config.s3.bucketName,
        subFolder: config.s3.subFolder,
      });
    default:
    case 'local':
      return localStorageRepo(config.local);
  }
};
