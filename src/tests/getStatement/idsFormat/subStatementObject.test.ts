import createSubStatement from '../../utils/createSubStatement';
import objectTest from './utils/objectTest';

describe('get ids statement in sub statement object', () => {
  objectTest((object: any): any => {
    return createSubStatement({ object });
  });
});
