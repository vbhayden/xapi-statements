import setupSubStatementTypeTest from './utils/setupSubStatementTypeTest';
import actorsTest from './utils/actorsTest';

describe('store statement with objectType in sub actors', () => {
  const assertTypedStatement = setupSubStatementTypeTest();
  actorsTest(assertTypedStatement);
});
