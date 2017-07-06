import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import storeStatements from './storeStatements';
import getStatement from './getStatement';
import getStatements from './getStatements';
import Config from './Config';

export default (config: Config): Service => {
  return {
    storeStatements: storeStatements(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    ...commonService(config),
  };
};
