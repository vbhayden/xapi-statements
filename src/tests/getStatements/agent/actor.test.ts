import actorTest from './utils/actorTest';

describe('get statements by agent in actor', () => {
  actorTest((actor: any) => {
    return { actor };
  });
});
