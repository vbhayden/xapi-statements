import { MongoClient } from 'mongodb';
import * as S3 from 'aws-sdk/clients/s3';
import memoryModelsRepo from '../memoryModelsRepo';
import mongoModelsRepo from '../mongoModelsRepo';
import localStorageRepo from '../localStorageRepo';
import s3StorageRepo from '../s3StorageRepo';
import Repo from './Repo';
import AuthRepo from './AuthRepo';
import StorageRepo from './StorageRepo';
import testAuthRepo from '../testAuthRepo';
import mongoAuthRepo from '../mongoAuthRepo';
import fetchAuthRepo from '../fetchAuthRepo';
import ModelsRepo from './ModelsRepo';
import config from '../config';

/* istanbul ignore next */
const getAuthRepo = (): AuthRepo => {
  switch (config.repoFactory.authRepoName) {
    case 'test':
      return testAuthRepo({});
    case 'fetch':
      return fetchAuthRepo({
        llClientInfoEndpoint: config.llClientInfoEndpoint,
      });
    default: case 'mongo':
      return mongoAuthRepo({
        db: MongoClient.connect(config.mongo.url),
      });
  }
};

/* istanbul ignore next */
const getModelsRepo = (): ModelsRepo => {
  switch (config.repoFactory.modelsRepoName) {
    case 'mongo':
      return mongoModelsRepo({
        db: MongoClient.connect(config.mongo.url),
      });
    default: case 'memory':
      return memoryModelsRepo({
        state: { statements: [] }
      });
  }
};

/* istanbul ignore next */
const getStorageRepo = (): StorageRepo => {
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

export default (): Repo => {
  const authRepo = getAuthRepo();
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await modelsRepo.clearRepo();
      await storageRepo.clearRepo();
    },
    migrate: async () => {
      await modelsRepo.migrate();
      await storageRepo.migrate();
    },
    rollback: async () => {
      await modelsRepo.rollback();
      await storageRepo.rollback();
    },
  };
};
