import { MongoClient } from 'mongodb';
import memoryModelsRepo from './utils/memoryModels/facade';
import mongoModelsRepo from './utils/mongoModels/facade';
import Repo from './Repo';
import Config from './Config';

export default (config: Config): Repo => {
  switch (config.facade) {
    case 'mongo':
      return mongoModelsRepo({
        db: MongoClient.connect(config.mongo.url),
      });
    default: case 'memory':
      return memoryModelsRepo(config.memory);
  }
};
