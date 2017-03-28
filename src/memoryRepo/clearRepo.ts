import { mapValues } from 'lodash';
import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    config.state = mapValues(config.state, () => []);
  };
};
