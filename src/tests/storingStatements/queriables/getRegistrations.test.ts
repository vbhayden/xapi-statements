import * as assert from 'assert';
import getRegistrations from '../../../service/storeStatements/queriables/getRegistrations';

const REG = '1c86d8e9-f325-404f-b3d9-24c451035585';
const REG2 = '1c86d8e9-f325-404f-b3d9-24c451035586';
const REG3 = '1c86d8e9-f325-404f-b3d9-24c451035587';
const model = {
  statement: {
    registration: REG
  }
};

describe('create array of queriable registrations', () => {
  it('should return just the registration from the statement', () => {
    const verbs = getRegistrations(model);
    assert.deepEqual(verbs, [REG]);
  });
});
