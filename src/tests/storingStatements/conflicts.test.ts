import * as assert from 'assert';
import { isArray } from 'lodash';
import Conflict from '../../errors/Conflict';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_CONFLICT = createStatement({
  id: TEST_ID,
  actor: {mbox: 'mailto:test2@example.com'},
});

describe('store statement conflicts', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should store statements when they use an existing id without conflicts in 2 batches', async () => {
    await storeStatements([TEST_STATEMENT]);
    const ids: string[] = await storeStatements([TEST_STATEMENT]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID]);
  });

  it('should not store statements when they use an existing id with conflicts in 2 batches', async () => {
    try {
      await storeStatements([TEST_STATEMENT]);
      await storeStatements([TEST_CONFLICT]);
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, Conflict);
    }
  });

  it('should store statements when they use an existing id without conflicts in 1 batch', async () => {
    const ids: string[] = await storeStatements([TEST_STATEMENT, TEST_STATEMENT]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID, TEST_ID]);
  });

  it('should not store statements when they use an existing id with conflicts in 1 batch', async () => {
    try {
      await storeStatements([TEST_STATEMENT, TEST_CONFLICT]);
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, Conflict);
    }
  });
});
