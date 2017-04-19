import canonicalActivityTest from './utils/canonicalActivityTest';
import createActivity from './utils/createActivity';

describe('get canonical statements object', () => {
  canonicalActivityTest((definition: any) => {
    return {
      object: createActivity(definition),
    };
  });
});
