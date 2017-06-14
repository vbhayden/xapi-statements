import Config from './Config';

export default (config: Config) => {
  return async (): Promise<void> => {
    (await config.db).dropDatabase();
  };
};
