import commonS3Repo from 'jscommons/dist/s3Repo';
import Repo from '../../Repo';
import createAttachments from '../../createAttachments/s3';
import getAttachment from '../../getAttachment/s3';
import Config from './Config';

export default (config: Config): Repo => {
  return {
    ...commonS3Repo(config),
    createAttachments: createAttachments(config),
    getAttachment: getAttachment(config),
  };
};
