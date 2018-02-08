import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import getDbFromUrl from 'jscommons/dist/mongoRepo/utils/getDbFromUrl';
import { defaultTo, once } from 'lodash';
import { LoggerInstance } from 'winston';
import logger from '../../../../logger';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import getClient from '../../getClient/mongo';
import FacadeConfig from './FacadeConfig';

const defaultConfig = {
  db: connectToDb({
    logger,
    dbName: 'xapi-statements',
    url: 'mongodb://localhost:27017',
  })
};

export default (factoryConfig: FactoryConfig = defaultConfig): Facade => {
  const facadeConfig: FacadeConfig = factoryConfig;
  return {
    getClient: getClient(facadeConfig),
  };
};
