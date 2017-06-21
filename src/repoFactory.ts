import { MongoClient } from 'mongodb';
import memoryRepo from './memoryRepo';
import MemoryRepoConfig from './memoryRepo/Config';
import mongoRepo from './mongoRepo';
import Repo from './repo';

interface MongoRepoConfig {
  url: string;
}

interface RepoFactoryConfig {
  repoName: string;
  memoryRepoConfig: MemoryRepoConfig;
  mongoRepoConfig: MongoRepoConfig;
}

export default (config: RepoFactoryConfig): Repo => {
  switch (config.repoName) {
    case 'mongo':
      return mongoRepo({
        db: MongoClient.connect(config.mongoRepoConfig.url),
      });
    default: case 'memory':
      return memoryRepo(config.memoryRepoConfig);
  }
};
