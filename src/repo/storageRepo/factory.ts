import * as S3 from 'aws-sdk/clients/s3';
import config from '../../config';
import localStorageRepo from './utils/localStorage/facade';
import s3StorageRepo from './utils/s3Storage/facade';
import Repo from './Repo';

export default (): Repo => {
  switch (config.repoFactory.storageRepoName) {
    case 's3':
      return s3StorageRepo({
        client: new S3(config.storage.s3.awsConfig),
        bucketName: config.storage.s3.bucketName,
        subFolder: config.storage.s3.subFolder,
      });
    default:
    case 'local':
      return localStorageRepo(config.storage.local);
  }
};
