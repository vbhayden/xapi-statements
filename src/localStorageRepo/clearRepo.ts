import * as fs from 'fs-extra';
import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    const attachmentsDirectory = `${config.storageDir}/attachments`;
    await fs.emptyDir(attachmentsDirectory);
  };
};
