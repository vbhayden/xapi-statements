import FullActivityModel from '../models/FullActivityModel';
import StoredStatementModel from '../models/StoredStatementModel';
import config from '../config';
import logger from '../logger';
import factory from './factory';
import Repo from './Repo';
import { once } from 'lodash';
import { Db, MongoClient } from 'mongodb';
import { delay } from 'bluebird';
import connectToMongoDb from './utils/connectToMongoDb';
import connectToRedis from './utils/connectToRedis';
import connectToSentinel from './utils/connectToSentinel';

const repo: Repo = factory({
  auth: {
    facade: config.repoFactory.authRepoName,
    fake: {},
    fetch: {
      llClientInfoEndpoint: config.llClientInfoEndpoint,
    },
    mongo: {
      db: connectToMongoDb(),
    },
  },
  events: {
    facade: config.repoFactory.eventsRepoName,
    redis: {
      client: connectToRedis(),
      prefix: config.redis.prefix,
    },
    sentinel: {
      client: connectToSentinel(),
      prefix: config.sentinel.prefix,
    }
  },
  models: {
    facade: config.repoFactory.modelsRepoName,
    memory: {
      state: {
        fullActivities: [] as FullActivityModel[],
        statements: [] as StoredStatementModel[],
      },
    },
    mongo: {
      db: connectToMongoDb(),
    },
  },
  storage: {
    facade: config.repoFactory.storageRepoName,
    local: {
      storageDir: config.storage.local.storageDir,
    },
    s3: {
      awsConfig: config.storage.s3.awsConfig,
      bucketName: config.storage.s3.bucketName,
      subFolder: config.storage.s3.subFolder,
    },
    google: {
      bucketName: config.storage.google.bucketName,
      keyFileName: config.storage.google.keyFileName,
      projectId: config.storage.google.projectId,
      subFolder: config.storage.google.subFolder,
    }
  },
});

export default repo;
