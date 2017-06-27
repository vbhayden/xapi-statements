import UnstoredStatementModel from '../models/UnstoredStatementModel';
import StoredStatementModel from '../models/StoredStatementModel';
import Statement from '../models/Statement';
import StatementHash from '../models/StatementHash';
import UpRef from '../models/UpRef';
import CreateStatementsOptions from './CreateStatementsOptions';
import GetHashesOptions from './GetHashesOptions';
import GetStatementsOptions from './GetStatementsOptions';
import GetStatementOptions from './GetStatementOptions';
import GetVoidersOptions from './GetVoidersOptions';
import VoidStatementsOptions from './VoidStatementsOptions';
import GetDownRefIdOptions from './GetDownRefIdOptions';
import GetUpRefIdsOptions from './GetUpRefIdsOptions';
import SetRefsOptions from './SetRefsOptions';
import GetStatementsByIdsOptions from './GetStatementsByIdsOptions';
import GetUpRefsByIdsOptions from './GetUpRefsByIdsOptions';

interface ModelsRepo {
  // Statement functions.
  createStatements: (opts: CreateStatementsOptions) => Promise<UnstoredStatementModel[]>;
  getStatement: (opts: GetStatementOptions) => Promise<StoredStatementModel>;
  getStatements: (opts: GetStatementsOptions) => Promise<StoredStatementModel[]>;
  getHashes: (opts: GetHashesOptions) => Promise<StatementHash[]>;
  getVoidersByObjectIds: (opts: GetVoidersOptions) => Promise<string[]>;
  getVoidersByIds: (opts: GetVoidersOptions) => Promise<string[]>;
  voidStatements: (opts: VoidStatementsOptions) => Promise<void>;
  getDownRefId: (opts: GetDownRefIdOptions) => Promise<string>;
  getUpRefIds: (opts: GetUpRefIdsOptions) => Promise<string[]>;
  setRefs: (opts: SetRefsOptions) => Promise<void>;
  getStatementsByIds: (opts: GetStatementsByIdsOptions) => Promise<Statement[]>;
  getUpRefsByIds: (opts: GetUpRefsByIdsOptions) => Promise<UpRef[]>;

  // Repo-wide functions.
  clearRepo: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default ModelsRepo;
