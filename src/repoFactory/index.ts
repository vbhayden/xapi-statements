import { MongoClient } from 'mongodb';
import * as S3 from 'aws-sdk/clients/s3';
import * as redis from 'redis';
import memoryModelsRepo from '../memoryModelsRepo';
import mongoModelsRepo from '../mongoModelsRepo';
import localStorageRepo from '../localStorageRepo';
import s3StorageRepo from '../s3StorageRepo';
import Repo from './Repo';
import AuthRepo from './AuthRepo';
import EventsRepo from './EventsRepo';
import StorageRepo from './StorageRepo';
import testAuthRepo from '../testAuthRepo';
import mongoAuthRepo from '../mongoAuthRepo';
import redisEventsRepo from '../redisEventsRepo';
import testEventsRepo from '../testEventsRepo';
import fetchAuthRepo from '../fetchAuthRepo';
import ModelsRepo from './ModelsRepo';
import config from '../config';

/* istanbul ignore next */
const getEventsRepo = (): EventsRepo => {
  switch (config.repoFactory.eventsRepoName) {
    case 'test':
      return testEventsRepo();
    default: case 'redis':
      return redisEventsRepo({
        client: redis.createClient({
          url: config.redis.url,
        }),
        prefix: config.redis.prefix,
      });
  }
};

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
        state: { statements: [], fullActivities: [] }
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
  const eventsRepo = getEventsRepo();
  const authRepo = getAuthRepo();
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
    ...eventsRepo,
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await Promise.all([
        eventsRepo.clearRepo(),
        modelsRepo.clearRepo(),
        storageRepo.clearRepo(),
      ]);
    },
    migrate: async () => {
      await Promise.all([
        eventsRepo.migrate(),
        modelsRepo.migrate(),
        storageRepo.migrate(),
      ]);
    },
    rollback: async () => {
      await Promise.all([
        eventsRepo.rollback(),
        modelsRepo.rollback(),
        storageRepo.rollback(),
      ]);
    },
  };
};
