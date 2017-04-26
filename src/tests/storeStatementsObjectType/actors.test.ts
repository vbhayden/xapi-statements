import setupObjectTypeTest from './utils/setupObjectTypeTest';
import actorsTest from './utils/actorsTest';

describe('store statement with objectType in actors', () => {
  const assertTypedStatement = setupObjectTypeTest();
  actorsTest(assertTypedStatement);
});
