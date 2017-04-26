import setupSubStatementTypeTest from './utils/setupSubStatementTypeTest';
import activitiesTest from './utils/activitiesTest';

describe('store statement with objectType in sub activities', () => {
  const assertTypedStatement = setupSubStatementTypeTest();
  activitiesTest(assertTypedStatement);
});
