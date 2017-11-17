import repo from '../repo/factory';
import service from '../service';
import Service from './Service';
import config from '../config';
import tracker from '../tracker';
import logger from '../logger';

export default (): Service => {
  return service({
    repo,
    tracker,
    logger,
    ...config.service,
  });
};
