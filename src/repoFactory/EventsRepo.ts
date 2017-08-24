import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import EmitNewStatementsOptions from './options/EmitNewStatementsOptions';

interface Repo extends CommonRepo {
  emitNewStatements: (opts: EmitNewStatementsOptions) => Promise<void>;
}

export default Repo;
