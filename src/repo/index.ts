import AttachmentModel from '../models/AttachmentModel';
import StatementModel from '../models/StatementModel';
import Statement from '../models/Statement';
import StatementHash from '../models/StatementHash';
import UpRef from '../models/UpRef';
import CreateAttachmentsOptions from './CreateAttachmentsOptions';
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
import GetAttachmentsOptions from './GetAttachmentsOptions';

interface Repo {
  // Statement functions.
  createStatements: (opts: CreateStatementsOptions) => Promise<StatementModel[]>;
  getStatement: (opts: GetStatementOptions) => Promise<StatementModel>;
  getStatements: (opts: GetStatementsOptions) => Promise<StatementModel[]>;
  getHashes: (opts: GetHashesOptions) => Promise<StatementHash[]>;
  getVoidersByObjectIds: (opts: GetVoidersOptions) => Promise<string[]>;
  getVoidersByIds: (opts: GetVoidersOptions) => Promise<string[]>;
  voidStatements: (opts: VoidStatementsOptions) => Promise<void>;
  getDownRefId: (opts: GetDownRefIdOptions) => Promise<string>;
  getUpRefIds: (opts: GetUpRefIdsOptions) => Promise<string[]>;
  setRefs: (opts: SetRefsOptions) => Promise<void>;
  getStatementsByIds: (opts: GetStatementsByIdsOptions) => Promise<Statement[]>;
  getUpRefsByIds: (opts: GetUpRefsByIdsOptions) => Promise<UpRef[]>;

  // Attachment functions.
  createAttachments: (opts: CreateAttachmentsOptions) => Promise<AttachmentModel[]>;
  getAttachments: (opts: GetAttachmentsOptions) => Promise<AttachmentModel[]>;

  // Repo-wide functions.
  clearRepo: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default Repo;
