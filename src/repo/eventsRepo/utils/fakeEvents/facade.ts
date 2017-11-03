import Repo from '../../Repo';

export default (): Repo => {
  return {
    emitNewStatements: async () => {},
    clearRepo: async () => {},
    migrate: async () => {},
    rollback: async () => {},
  };
};
