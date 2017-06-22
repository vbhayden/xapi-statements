import StorageRepo from './StorageRepo';
import ModelsRepo from './ModelsRepo';

interface Repo extends ModelsRepo, StorageRepo {}

export default Repo;
