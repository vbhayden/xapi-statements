import { MongoClient } from 'mongodb';
import memoryStorageRepo from './memoryStorageRepo';
import memoryModelsRepo from './memoryModelsRepo';
import mongoModelsRepo from './mongoModelsRepo';
import localStorageRepo from './localStorageRepo';
import Repo from './repo';
import StorageRepo from './repo/StorageRepo';
import ModelsRepo from './repo/ModelsRepo';
import config from './config';

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

const getStorageRepo = (): StorageRepo => {
  switch (config.storageRepoName) {
    case 'local':
      return localStorageRepo(config.storage.local);
    default: case 'memory':
      return memoryStorageRepo({
        state: { attachments: [] }
      });
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
