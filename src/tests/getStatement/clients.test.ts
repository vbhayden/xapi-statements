import * as assert from 'assert';
import { isArray } from 'lodash';
import assertError from 'jscommons/dist/tests/utils/assertError';
import Conflict from '../../errors/Conflict';
import DuplicateId from '../../errors/DuplicateId';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createClientModel from '../utils/createClientModel';
import storeStatementsInService from '../utils/storeStatementsInService';

const lrs2_id = '5988f0f00000000000000002';

const lrs2_client = createClientModel({lrs_id: lrs2_id});

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_CONFLICT = createStatement({
  id: TEST_ID,
  actor: { mbox: 'mailto:test2@example.com' },
});

describe('get statement with same id in different stores', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should return the correct statement from the client\'s store', async () => {
    await storeStatements([TEST_STATEMENT]);
    await storeStatements([TEST_STATEMENT], [], lrs2_client);

    const ids: string[] = await storeStatements([TEST_STATEMENT]);
    console.log(ids);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID]);
  });
});
