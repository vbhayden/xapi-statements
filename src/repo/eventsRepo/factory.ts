import * as redis from 'redis';
import config from '../../config';
import fakeEventsRepo from './utils/fakeEvents/facade';
import redisEventsRepo from './utils/redisEvents/facade';
import Repo from './Repo';

export default (): Repo => {
  switch (config.repoFactory.eventsRepoName) {
    case 'test':
      return fakeEventsRepo();
    default: case 'redis':
      return redisEventsRepo({
        client: redis.createClient({
          url: config.redis.url,
        }),
        prefix: config.redis.prefix,
      });
  }
};
