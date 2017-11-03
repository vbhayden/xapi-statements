import commonFsRepo from 'jscommons/dist/fsRepo';
import Repo from '../../Repo';
import Config from './Config';
import createAttachments from '../../createAttachments/local';
import getAttachment from '../../getAttachment/local';

export default (config: Config): Repo => {
  return {
    ...commonFsRepo(config),
    createAttachments: createAttachments(config),
    getAttachment: getAttachment(config),
  };
};
