import repoFactory from '../repoFactory';
import service from '../service';
import Service from './Service';
import config from '../config';

export default (): Service => {
  const repoFacade = repoFactory();

  return service({
    repo: repoFacade,
    ...config.service,
  });
};
