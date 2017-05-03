import activityTest from './utils/activityTest';
import assertFilteredStatements from './utils/assertFilteredStatements';
import assertFilteredStatementRefs from './utils/assertFilteredStatementRefs';

describe('get statements by activity', () => {
  activityTest(assertFilteredStatements);
});

describe('get statements by activity with statement references', () => {
  activityTest(assertFilteredStatementRefs);
});
