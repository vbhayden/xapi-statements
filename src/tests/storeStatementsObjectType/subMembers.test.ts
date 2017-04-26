import setupSubStatementTypeTest from './utils/setupSubStatementTypeTest';
import membersTest from './utils/membersTest';

describe('store statement with objectType in sub members', () => {
  const assertTypedStatement = setupSubStatementTypeTest();
  membersTest(assertTypedStatement);
});
