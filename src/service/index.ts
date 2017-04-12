import Statement from '../models/Statement';
import IdFormattedStatement from '../models/IdFormattedStatement';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetStatementsOptions from './options/GetStatementsOptions';
import GetCanonicalStatementsOptions from './options/GetCanonicalStatementsOptions';
import storeStatements from './storeStatements';
import getStatement from './getStatement';
import getIdsStatements from './getIdsStatements';
import getCanonicalStatements from './getCanonicalStatements';
import getExactStatements from './getExactStatements';
import Config from './Config';

export interface Service {
  // Statement functions.
  storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
  getStatement: (opts: GetStatementOptions) => Promise<Statement>;
  getIdsStatements: (opts: GetStatementsOptions) => Promise<IdFormattedStatement[]>;
  getCanonicalStatements: (opts: GetCanonicalStatementsOptions) => Promise<Statement[]>;
  getExactStatements: (opts: GetStatementsOptions) => Promise<Statement[]>;

  // Service-wide functions.
  clearService: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default (config: Config): Service => {
  return {
    storeStatements: storeStatements(config),
    getStatement: getStatement(config),
    getIdsStatements: getIdsStatements(config),
    getCanonicalStatements: getCanonicalStatements(config),
    getExactStatements: getExactStatements(config),

    clearService: config.repo.clearRepo,
    migrate: config.repo.migrate,
    rollback: config.repo.rollback,
  };
};
