import * as assert from 'assert';
import getRegistrationsFromStatement from '../../../service/storeStatements/queriables/getRegistrationsFromStatement';

const REG = '1c86d8e9-f325-404f-b3d9-24c451035585';
const model = {
  context: {
    registration: REG
  }
};

describe.only('create array of queriable registrations', () => {
  it('should return just the registration from the statement', () => {
    const verbs = getRegistrationsFromStatement(model);
    assert.deepEqual(verbs, [REG]);
  });
});
