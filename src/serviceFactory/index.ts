import repoFactory from '../repoFactory';
import service from '../service';
import Service from './Service';
import config from '../config';
import tracker from '../tracker';

export default (): Service => {
  const repoFacade = repoFactory();

  return service({
    repo: repoFacade,
    tracker: tracker(),
    ...config.service,
  });
};
