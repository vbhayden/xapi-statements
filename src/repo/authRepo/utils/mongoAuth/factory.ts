import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import getDbFromUrl from 'jscommons/dist/mongoRepo/utils/getDbFromUrl';
import { defaultTo, once } from 'lodash';
import { LoggerInstance } from 'winston';
import logger from '../../../../logger';
import Facade from '../../Facade';
import FactoryConfig from './FactoryConfig';
import getClient from '../../getClient/mongo';
import FacadeConfig from './FacadeConfig';
import connectToMongoDb from '../../../utils/connectToMongoDb';

export default (factoryConfig?: FactoryConfig): Facade => {
  const facadeConfig: FacadeConfig = (
    factoryConfig !== undefined
      ? factoryConfig
      : { db: connectToMongoDb() }
  );
  return {
    getClient: getClient(facadeConfig),
  };
};
