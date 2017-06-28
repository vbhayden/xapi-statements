import StorageRepo from '../repo/StorageRepo';
import Config from './Config';
import clearRepo from './clearRepo';
import createAttachments from './createAttachments';
import getAttachment from './getAttachment';

export default (config: Config): StorageRepo => {
  return {
    // Attachment functions.
    createAttachments: createAttachments(config),
    getAttachment: getAttachment(config),

    // Repo-wide functions.
    clearRepo: clearRepo(config),
    migrate: () => Promise.resolve(),
    rollback: () => Promise.resolve(),
  };
};
