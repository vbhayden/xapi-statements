import EventsRepo from '../repoFactory/EventsRepo';
import Config from './Config';
import emitNewStatements from './emitNewStatements';
import clearRepo from './clearRepo';

export default (config: Config): EventsRepo => {
  return {
    emitNewStatements: emitNewStatements(config),
    clearRepo: clearRepo(config),
    migrate: async () => {},
    rollback: async () => {},
  };
};
