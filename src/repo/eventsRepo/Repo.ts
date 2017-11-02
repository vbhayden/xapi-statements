import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import EmitNewStatementsSignature from './emitNewStatements/Signature';

interface Repo extends CommonRepo {
  readonly emitNewStatements: EmitNewStatementsSignature;
}

export default Repo;
