import Repo from '../../Repo';
import Config from './Config';
import getClient from '../../getClient/fake';

export default (config: Config): Repo => {
  return {
    getClient: getClient(config),
  };
};
