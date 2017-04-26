import setupObjectTypeTest from './utils/setupObjectTypeTest';
import activitiesTest from './utils/activitiesTest';

describe('store statement with objectType in activities', () => {
  const assertTypedStatement = setupObjectTypeTest();
  activitiesTest(assertTypedStatement);
});
