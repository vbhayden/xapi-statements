import AuthFacade from './authRepo/Repo';
import EventsFacade from './eventsRepo/Repo';
import StorageFacade from './storageRepo/Facade';
import ModelsFacade from './modelsRepo/Repo';

export default interface Repo extends AuthFacade, EventsFacade, ModelsFacade, StorageFacade { }
