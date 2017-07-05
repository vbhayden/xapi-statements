import commonS3Repo from 'jscommons/dist/s3Repo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';
import createAttachments from './createAttachments';
import getAttachment from './getAttachment';

export default (config: Config): StorageRepo => {
  return {
    // Attachment functions.
    createAttachments: createAttachments(config),
    getAttachment: getAttachment(config),
    ...commonS3Repo(config),
  };
};
