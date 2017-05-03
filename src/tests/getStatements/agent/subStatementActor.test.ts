import createSubStatement from '../../utils/createSubStatement';
import actorTest from './utils/actorTest';

describe('get statements by agent in sub statement actor', () => {
  actorTest((actor: any) => {
    return createSubStatement({ actor });
  }, true);
});
