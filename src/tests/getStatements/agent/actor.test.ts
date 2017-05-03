import actorTest from './utils/actorTest';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';

const createActor = (actor: any) => {
  return { actor };
};

describe('get statements by agent in actor', () => {
  actorTest(assertFilteredStatements)(createActor);
});

describe('get statements by agent in actor with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor);
});
