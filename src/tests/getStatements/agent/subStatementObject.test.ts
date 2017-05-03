import createSubStatement from '../../utils/createSubStatement';
import actorTest from './utils/actorTest';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';

const createActor = (object: any) => {
  return createSubStatement({ object });
};

describe('get statements by agent in sub statement object', () => {
  actorTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in sub statement object with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor, true);
});
