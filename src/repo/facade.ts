import authRepoFacade from './authRepo/facade';
import eventsRepoFacade from './eventsRepo/facade';
import modelsRepoFacade from './modelsRepo/facade';
import storageRepoFacade from './storageRepo/facade';
import Repo from './Repo';
import Config from './Config';

export default (config: Config): Repo => {
  const authRepo = authRepoFacade(config.auth);
  const eventsRepo = eventsRepoFacade(config.events);
  const modelsRepo = modelsRepoFacade(config.models);
  const storageRepo = storageRepoFacade(config.storage);

  return {
    ...eventsRepo,
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await Promise.all([
        eventsRepo.clearRepo(),
        modelsRepo.clearRepo(),
        storageRepo.clearRepo(),
      ]);
    },
    migrate: async () => {
      await Promise.all([
        eventsRepo.migrate(),
        modelsRepo.migrate(),
        storageRepo.migrate(),
      ]);
    },
    rollback: async () => {
      await Promise.all([
        eventsRepo.rollback(),
        modelsRepo.rollback(),
        storageRepo.rollback(),
      ]);
    },
  };
};
