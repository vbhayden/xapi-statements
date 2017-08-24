import * as redis from 'redis';

interface Config {
  readonly client: redis.RedisClient;
  readonly prefix: string;
}

export default Config;
