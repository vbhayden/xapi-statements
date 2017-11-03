import * as redis from 'redis';
import fakeEventsRepo from './utils/fakeEvents/facade';
import redisEventsRepo from './utils/redisEvents/facade';
import Repo from './Repo';
import Config from './Config';

export default (config: Config): Repo => {
  switch (config.facade) {
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
