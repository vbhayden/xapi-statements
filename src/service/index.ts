import StatementsResult from '../models/StatementsResult';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetStatementsOptions from './options/GetStatementsOptions';
import storeStatements from './storeStatements';
import getStatement from './getStatement';
import getStatements from './getStatements';
import Config from './Config';

export interface Service {
  // Statement functions.
  storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
  getStatement: (opts: GetStatementOptions) => Promise<StatementsResult>;
  getStatements: (opts: GetStatementsOptions) => Promise<StatementsResult>;

  // Service-wide functions.
  clearService: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default (config: Config): Service => {
  return {
    storeStatements: storeStatements(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),

    clearService: config.repo.clearRepo,
    migrate: config.repo.migrate,
    rollback: config.repo.rollback
  };
};
