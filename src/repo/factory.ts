import authRepoFactory from './authRepo/factory';
import eventsRepoFactory from './eventsRepo/factory';
import modelsRepoFactory from './modelsRepo/factory';
import storageRepoFactory from './storageRepo/factory';
import Repo from './Repo';

const authRepo = authRepoFactory();
const eventsRepo = eventsRepoFactory();
const modelsRepo = modelsRepoFactory();
const storageRepo = storageRepoFactory();

const repo: Repo = {
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

export default repo;
