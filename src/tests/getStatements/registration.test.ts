import registrationTest from './utils/registrationTest';
import assertFilteredStatements from './utils/assertFilteredStatements';
import assertFilteredStatementRefs from './utils/assertFilteredStatementRefs';

describe('get statements by registration', () => {
  registrationTest(assertFilteredStatements);
});

describe('get statements by registration with statement references', () => {
  registrationTest(assertFilteredStatementRefs);
});
