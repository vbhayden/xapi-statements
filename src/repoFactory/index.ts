import { MongoClient } from 'mongodb';
import { S3 } from 'aws-sdk';
import memoryModelsRepo from '../memoryModelsRepo';
import mongoModelsRepo from '../mongoModelsRepo';
import localStorageRepo from '../localStorageRepo';
import s3StorageRepo from '../s3StorageRepo';
import Repo from './Repo';
import StorageRepo from './StorageRepo';
import ModelsRepo from './ModelsRepo';
import config from '../config';

/* istanbul ignore next */
const getModelsRepo = (): ModelsRepo => {
  switch (config.modelsRepoName) {
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
  switch (config.storageRepoName) {
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
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
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
