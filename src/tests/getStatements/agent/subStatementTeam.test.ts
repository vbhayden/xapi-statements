import createSubStatement from '../../utils/createSubStatement';
import groupTest from './utils/groupTest';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';

const createActor = (team: any) => {
  return createSubStatement({ context: { team } });
};

describe('get statements by agent in sub statement team', () => {
  groupTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in sub statement team with references', () => {
  groupTest(assertFilteredStatementRefs)(createActor, true);
});
