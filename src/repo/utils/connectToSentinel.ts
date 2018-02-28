import { once, defaultTo } from 'lodash';
import config from '../../config';
import logger from '../../logger';
import * as Ioredis from 'ioredis';

export default once((): () => Promise<Ioredis.Redis> => {
  return once(async () => {
    logger.info('Creating sentinel connection');
    return new Ioredis({
      sentinels: config.sentinel.sentinels,
      name: config.sentinel.name,
    });
  });
});
