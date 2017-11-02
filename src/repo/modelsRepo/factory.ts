import { MongoClient } from 'mongodb';
import config from '../../config';
import memoryModelsRepo from './utils/memoryModels/facade';
import mongoModelsRepo from './utils/mongoModels/facade';
import Repo from './Repo';

export default (): Repo => {
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
