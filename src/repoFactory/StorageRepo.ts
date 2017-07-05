import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateAttachmentsOptions from './options/CreateAttachmentsOptions';
import GetAttachmentOptions from './options/GetAttachmentOptions';

interface StorageRepo extends CommonRepo {
  // Attachment functions.
  createAttachments: (opts: CreateAttachmentsOptions) => Promise<void>;
  getAttachment: (opts: GetAttachmentOptions) => Promise<NodeJS.ReadableStream>;
}

export default StorageRepo;
