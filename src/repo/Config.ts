import AuthConfig from './authRepo/Config';
import EventsConfig from './eventsRepo/Config';
import ModelsConfig from './modelsRepo/Config';
import StorageConfig from './storageRepo/Config';

export default interface Config {
  readonly auth: AuthConfig;
  readonly events: EventsConfig;
  readonly models: ModelsConfig;
  readonly storage: StorageConfig;
}
