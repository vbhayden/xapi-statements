import RedisConfig from './utils/redisEvents/Config';

export default interface Config {
  readonly facade: string;
  readonly redis: {
    readonly url: string;
    readonly prefix: string;
  };
}
