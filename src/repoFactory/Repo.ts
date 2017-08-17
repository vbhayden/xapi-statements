import AuthRepo from './AuthRepo';
import StorageRepo from './StorageRepo';
import ModelsRepo from './ModelsRepo';

interface Repo extends AuthRepo, ModelsRepo, StorageRepo {}

export default Repo;
