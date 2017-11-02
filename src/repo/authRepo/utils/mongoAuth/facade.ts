import Repo from '../../Repo';
import Config from './Config';
import getClient from '../../getClient/mongo';

export default (config: Config): Repo => {
  return {
    getClient: getClient(config),
  };
};
