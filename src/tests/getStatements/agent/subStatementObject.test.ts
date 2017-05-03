import createSubStatement from '../../utils/createSubStatement';
import actorTest from './utils/actorTest';

describe('get statements by agent in sub statement object', () => {
  actorTest((object: any) => {
    return createSubStatement({ object });
  }, true);
});
