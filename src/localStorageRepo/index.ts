import Repo from '../repo';
import Config from './Config';
import clearRepo from './clearRepo';
import createAttachments from './createAttachments';
import getAttachments from './getAttachments';

export default (config: Config): Partial<Repo> => {
  return {
    // Attachment functions.
    createAttachments: createAttachments(config),
    getAttachments: getAttachments(config),

    // Repo-wide functions.
    clearRepo: clearRepo(config),
    migrate: () => Promise.resolve(),
    rollback: () => Promise.resolve(),
  };
};
