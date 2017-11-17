import Tracker from 'jscommons/dist/tracker/Tracker';
import Repo from '../repo/Repo';
import { LoggerInstance } from 'winston';

interface Config {
  repo: Repo;
  tracker: Promise<Tracker>;
  logger: LoggerInstance;
  enableConflictChecks: boolean;
  enableAttachmentValidation: boolean;
  enableVoidingChecks: boolean;
  enableStatementCreation: boolean;
  enableAttachmentCreation: boolean;
  enableVoiding: boolean;
  enableReferencing: boolean;
  awaitUpdates: boolean;
  enableActivityUpdates: boolean;
  enableNullRemoval: boolean;
}

export default Config;
