import { once, defaultTo } from 'lodash';
import config from '../../config';
import logger from '../../logger';
import * as Ioredis from 'ioredis';

export default once((): () => Promise<Ioredis.Redis> => {
  return once(async () => {
    logger.info('Creating redis connection');
    return new Ioredis(
      defaultTo(config.redis.url, 'redis://127.0.0.1:6379/0')
    );
  });
});
