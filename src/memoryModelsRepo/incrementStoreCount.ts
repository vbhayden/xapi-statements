import IncrementStoreCountOptions from '../repoFactory/options/IncrementStoreCountOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: IncrementStoreCountOptions): Promise<void> => {
    // no lrs in memory :)
    return;
  };
};
