import EventsRepo from '../repoFactory/EventsRepo';

export default (): EventsRepo => {
  return {
    emitNewStatements: async () => {},
    clearRepo: async () => {},
    migrate: async () => {},
    rollback: async () => {},
  };
};
