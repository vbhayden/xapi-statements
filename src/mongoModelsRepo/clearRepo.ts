import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    await (await config.db).dropDatabase();
  };
};
