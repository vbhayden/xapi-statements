import actorTest from './utils/actorTest';

describe('get ids statements in object', () => {
  actorTest((object: any): any => {
    return { object };
  });
});
