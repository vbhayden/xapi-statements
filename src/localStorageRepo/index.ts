import commonFsRepo from 'jscommons/dist/fsRepo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';
import createAttachments from './createAttachments';
import getAttachment from './getAttachment';

export default (config: Config): StorageRepo => {
  return {
    // Attachment functions.
    createAttachments: createAttachments(config),
    getAttachment: getAttachment(config),
    ...commonFsRepo(config),
  };
};
