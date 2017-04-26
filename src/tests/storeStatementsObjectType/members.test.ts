import setupObjectTypeTest from './utils/setupObjectTypeTest';
import membersTest from './utils/membersTest';

describe('store statement with objectType in members', () => {
  const assertTypedStatement = setupObjectTypeTest();
  membersTest(assertTypedStatement);
});
