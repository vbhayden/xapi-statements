import createSubStatement from '../utils/createSubStatement';
import objectTest from './utils/objectTest';

describe('get ids statements in sub statement object', () => {
  objectTest((object: any): any => {
    return createSubStatement({ object });
  });
});
