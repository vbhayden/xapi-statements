import Repo from '../../Repo';
import Config from './Config';
import getClient from '../../getClient/fetch';

export default (config: Config): Repo => {
  return {
    getClient: getClient(config),
  };
};
