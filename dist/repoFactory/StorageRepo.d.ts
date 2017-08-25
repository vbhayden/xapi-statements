import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import CreateAttachmentsOptions from './options/CreateAttachmentsOptions';
import GetAttachmentOptions from './options/GetAttachmentOptions';
import GetAttachmentResult from './results/GetAttachmentResult';
interface StorageRepo extends CommonRepo {
    createAttachments: (opts: CreateAttachmentsOptions) => Promise<void>;
    getAttachment: (opts: GetAttachmentOptions) => Promise<GetAttachmentResult>;
}
export default StorageRepo;
