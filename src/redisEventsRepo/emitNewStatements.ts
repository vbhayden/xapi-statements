import EmitNewStatementsOptions from '../repoFactory/options/EmitNewStatementsOptions';
import Config from './Config';

const EVENT_NAME = 'statement.new';
const CHANNEL_NAME = 'statement.notify';

export default (config: Config) => {
  const rpush = (key: string, ...args: string[]) => {
    return new Promise((resolve) => {
      config.client.rpush(key, ...args, () => {
        resolve();
      });
    });
  };

  return async (opts: EmitNewStatementsOptions): Promise<void> => {
    const listName = `${config.prefix}:${EVENT_NAME}`;
    const channelName = `${config.prefix}:${CHANNEL_NAME}`;
    await rpush(listName, ...opts.ids);
    config.client.publish(channelName, '');
  };
};
