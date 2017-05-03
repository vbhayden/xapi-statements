import createSubStatement from '../../utils/createSubStatement';
import actorTest from './utils/actorTest';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';

const createActor = (actor: any) => {
  return createSubStatement({ actor });
};

describe('get statements by agent in sub statement actor', () => {
  actorTest(assertFilteredStatements)(createActor, true);
});

describe('get statements by agent in sub statement actor with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor, true);
});
