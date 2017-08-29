import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import UnstoredStatementModel from '../models/UnstoredStatementModel';
import StoredStatementModel from '../models/StoredStatementModel';
import Statement from '../models/Statement';
import StatementHash from '../models/StatementHash';
import UpRef from '../models/UpRef';
import CreateStatementsOptions from './options/CreateStatementsOptions';
import GetHashesOptions from './options/GetHashesOptions';
import GetStatementsOptions from './options/GetStatementsOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetVoidersOptions from './options/GetVoidersOptions';
import VoidStatementsOptions from './options/VoidStatementsOptions';
import GetDownRefIdOptions from './options/GetDownRefIdOptions';
import GetUpRefIdsOptions from './options/GetUpRefIdsOptions';
import SetRefsOptions from './options/SetRefsOptions';
import GetStatementsByIdsOptions from './options/GetStatementsByIdsOptions';
import GetUpRefsByIdsOptions from './options/GetUpRefsByIdsOptions';
import GetFullActivityOptions from './options/GetFullActivityOptions';
import GetFullActivityResult from './results/GetFullActivityResult';
import UpdateFullActivitiesOptions from './options/UpdateFullActivitiesOptions';

interface ModelsRepo extends CommonRepo {
  createStatements: (opts: CreateStatementsOptions) => Promise<UnstoredStatementModel[]>;
  getFullActivity: (opts: GetFullActivityOptions) => Promise<GetFullActivityResult>;
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
  updateFullActivities: (opts: UpdateFullActivitiesOptions) => Promise<void>;
}

export default ModelsRepo;
