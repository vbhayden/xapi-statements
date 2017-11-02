import AuthRepo from './authRepo/Repo';
import EventsRepo from './eventsRepo/Repo';
import StorageRepo from './storageRepo/Repo';
import ModelsRepo from './modelsRepo/Repo';

export default interface Repo extends AuthRepo, EventsRepo, ModelsRepo, StorageRepo {}
