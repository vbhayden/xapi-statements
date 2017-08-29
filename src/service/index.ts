import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import storeStatements from './storeStatements';
import getClient from './getClient';
import getStatement from './getStatement';
import getStatements from './getStatements';
import getFullActivity from './getFullActivity';
import Config from './Config';

export default (config: Config): Service => {
  return {
    getClient: getClient(config),
    storeStatements: storeStatements(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    getFullActivity: getFullActivity(config),
    ...commonService(config),
  };
};
