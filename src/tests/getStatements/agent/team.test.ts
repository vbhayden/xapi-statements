import groupTest from './utils/groupTest';

describe('get statements by agent in team', () => {
  groupTest((team: any) => {
    return { context: { team } };
  }, true);
});
