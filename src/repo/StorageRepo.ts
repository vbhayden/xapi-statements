import AttachmentModel from '../models/AttachmentModel';
import CreateAttachmentsOptions from './CreateAttachmentsOptions';
import GetAttachmentsOptions from './GetAttachmentsOptions';

interface StorageRepo {
  // Attachment functions.
  createAttachments: (opts: CreateAttachmentsOptions) => Promise<AttachmentModel[]>;
  getAttachments: (opts: GetAttachmentsOptions) => Promise<AttachmentModel[]>;

  // Repo-wide functions.
  clearRepo: () => Promise<void>;
  migrate: () => Promise<void>;
  rollback: () => Promise<void>;
}

export default StorageRepo;
