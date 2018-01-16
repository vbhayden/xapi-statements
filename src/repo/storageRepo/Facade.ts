import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateAttachmentsSignature from './createAttachments/Signature';
import GetAttachmentSignature from './getAttachment/Signature';

interface StorageRepo extends CommonRepo {
  readonly createAttachments: CreateAttachmentsSignature;
  readonly getAttachment: GetAttachmentSignature;
}

export default StorageRepo;
