import AuthRepo from './AuthRepo';
import EventsRepo from './EventsRepo';
import StorageRepo from './StorageRepo';
import ModelsRepo from './ModelsRepo';
interface Repo extends AuthRepo, EventsRepo, ModelsRepo, StorageRepo {
}
export default Repo;
