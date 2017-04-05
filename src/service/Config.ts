import { Repo } from '../repo';

interface Config {
  repo: Repo;
  defaultTimeout: number;
  enableConflictChecks: boolean;
  enableAttachmentValidation: boolean;
  enableVoidingChecks: boolean;
  enableStatementCreation: boolean;
  enableAttachmentCreation: boolean;
  enableVoiding: boolean;
  enableReferencing: boolean;
}

export default Config;
