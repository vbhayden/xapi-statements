import clearRepo from '../../clearRepo/redis';
import emitNewStatements from '../../emitNewStatements/redis';
import Repo from '../../Repo';
import Config from './Config';

export default (config: Config): Repo => {
  return {
    emitNewStatements: emitNewStatements(config),
    clearRepo: clearRepo(config),
    migrate: async () => {},
    rollback: async () => {},
  };
};
