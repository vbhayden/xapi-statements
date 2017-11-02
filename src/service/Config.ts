import Tracker from 'jscommons/dist/tracker/Tracker';
import Repo from '../repo/Repo';

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
