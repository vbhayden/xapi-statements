import actorTest from './actorTest';

describe('get statements by agent in object', () => {
  actorTest((object: any) => {
    return { object };
  });
});
