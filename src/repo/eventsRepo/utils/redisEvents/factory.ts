import { defaultTo } from 'lodash';
import clearRepo from '../../clearRepo/redis';
import emitNewStatements from '../../emitNewStatements/redis';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import FacadeConfig from './FacadeConfig';
import connectToRedis from '../../../utils/connectToRedis';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    client: defaultTo(factoryConfig.client, connectToRedis()),
    prefix: defaultTo(factoryConfig.prefix, 'xapistatements'),
  };
  return {
    emitNewStatements: emitNewStatements(facadeConfig),
    clearRepo: clearRepo(facadeConfig),
    migrate: async () => { },
    rollback: async () => { },
  };
};
