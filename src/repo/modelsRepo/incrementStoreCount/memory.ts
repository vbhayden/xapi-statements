import Config from '../utils/memoryModels/Config';
import Signature, { Opts } from './Signature';

export default (_config: Config) => {
  return async () => {
    // no lrs in memory :)
    return;
  };
};
