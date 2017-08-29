import Repo from '../repoFactory/Repo';

interface Config {
  repo: Repo;
  enableConflictChecks: boolean;
  enableAttachmentValidation: boolean;
  enableVoidingChecks: boolean;
  enableStatementCreation: boolean;
  enableAttachmentCreation: boolean;
  enableVoiding: boolean;
  enableReferencing: boolean;
  awaitUpdates: boolean;
  enableActivityUpdates: boolean;
}

export default Config;
