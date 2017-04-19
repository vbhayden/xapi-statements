import createSubStatement from '../utils/createSubStatement';
import canonicalActivityTest from './utils/canonicalActivityTest';
import createActivity from './utils/createActivity';

describe('get canonical statements sub statement object', () => {
  canonicalActivityTest((definition: any) => {
    return createSubStatement({
      object: createActivity(definition),
    });
  });
});
