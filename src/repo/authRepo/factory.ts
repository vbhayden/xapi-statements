import { MongoClient } from 'mongodb';
import config from '../../config';
import fakeAuthRepo from './utils/fakeAuth/facade';
import fetchAuthRepo from './utils/fetchAuth/facade';
import mongoAuthRepo from './utils/mongoAuth/facade';
import Repo from './Repo';

export default (): Repo => {
  switch (config.repoFactory.authRepoName) {
    case 'test':
      return fakeAuthRepo({});
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
