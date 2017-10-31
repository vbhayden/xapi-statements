import Repo from '../repoFactory/Repo';
import { Tracker } from '../tracker';

interface Config {
  repo: Repo;
  tracker: Promise<Tracker>;
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
