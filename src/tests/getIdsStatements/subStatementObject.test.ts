import createSubStatement from '../utils/createSubStatement';
import actorTest from './utils/actorTest';

describe('get ids statements in sub statement object', () => {
  actorTest((object: any): any => {
    return createSubStatement({ object });
  });
});
