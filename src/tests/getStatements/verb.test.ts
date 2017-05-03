import verbTest from './utils/verbTest';
import assertFilteredStatements from './utils/assertFilteredStatements';
import assertFilteredStatementRefs from './utils/assertFilteredStatementRefs';

describe('get statements by verb', () => {
  verbTest(assertFilteredStatements);
});

describe('get statements by verb with statement references', () => {
  verbTest(assertFilteredStatementRefs);
});
