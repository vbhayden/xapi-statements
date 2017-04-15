import actorTest from './utils/actorTest';

describe('get statements by agent in object', () => {
  actorTest((object: any) => {
    return { object };
  });
});
