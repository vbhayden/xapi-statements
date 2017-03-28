import { Repo } from '../repo';
import Config from './Config';
import clearRepo from './clearRepo';
import createStatements from './createStatements';
import getNonVoidedStatement from './getNonVoidedStatement';
import getStatement from './getStatement';
import getStatements from './getStatements';
import getVoidedStatement from './getVoidedStatement';
import getVoider from './getVoider';
import voidStatements from './voidStatements';

export default (config: Config): Repo => {
  return {
    createStatements: createStatements(config),
    getNonVoidedStatement: getNonVoidedStatement(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    getVoidedStatement: getVoidedStatement(config),
    getVoider: getVoider(config),
    voidStatements: voidStatements(config),

    clearRepo: clearRepo(config),
    migrate: () => Promise.resolve(),
    rollback: () => Promise.resolve(),
  };
};
