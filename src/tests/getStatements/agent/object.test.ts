import actorTest from './utils/actorTest';
import assertFilteredStatements from '../utils/assertFilteredStatements';
import assertFilteredStatementRefs from '../utils/assertFilteredStatementRefs';

const createActor = (object: any) => {
  return { object };
};

describe('get statements by agent in object', () => {
  actorTest(assertFilteredStatements)(createActor);
});

describe('get statements by agent in object with references', () => {
  actorTest(assertFilteredStatementRefs)(createActor);
});
