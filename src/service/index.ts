import Statement from '../models/Statement';
import AttachmentResult from '../models/AttachmentResult';
import IdFormattedAttachmentResult from '../models/IdFormattedAttachmentResult';
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
import getIdsStatementsWithAttachments from './getIdsStatementsWithAttachments';
import getCanonicalStatementsWithAttachments from './getCanonicalStatementsWithAttachments';
import getExactStatementsWithAttachments from './getExactStatementsWithAttachments';
import Config from './Config';

export interface Service {
  // Statement functions.
  storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
  getStatement: (opts: GetStatementOptions) => Promise<Statement>;
  getIdsStatements: (opts: GetStatementsOptions) => Promise<IdFormattedStatement[]>;
  getCanonicalStatements: (opts: GetCanonicalStatementsOptions) => Promise<Statement[]>;
  getExactStatements: (opts: GetStatementsOptions) => Promise<Statement[]>;
  getIdsStatementsWithAttachments: (opts: GetStatementsOptions) => Promise<IdFormattedAttachmentResult>;
  getCanonicalStatementsWithAttachments: (opts: GetCanonicalStatementsOptions) => Promise<AttachmentResult>;
  getExactStatementsWithAttachments: (opts: GetStatementsOptions) => Promise<AttachmentResult>;

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
    getIdsStatementsWithAttachments: getIdsStatementsWithAttachments(config),
    getCanonicalStatementsWithAttachments: getCanonicalStatementsWithAttachments(config),
    getExactStatementsWithAttachments: getExactStatementsWithAttachments(config),

    clearService: config.repo.clearRepo,
    migrate: config.repo.migrate,
    rollback: config.repo.rollback,
  };
};
