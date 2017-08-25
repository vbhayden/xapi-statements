import createSubStatement from '../../utils/createSubStatement';
import createIdsSubStatement from '../../utils/createIdsSubStatement';
import groupTest from './utils/groupTest';

describe('get ids statements in sub statement team', () => {
  groupTest((team: any): any => {
    return createSubStatement({ context: { team } });
  }, (team: any): any => {
    return createIdsSubStatement({ context: { team } });
  });
});
