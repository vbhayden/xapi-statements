import * as assert from 'assert';
import { isArray } from 'lodash';
import Conflict from '../../errors/Conflict';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';

describe('store statement conflicts', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  it('should store statements when they use an existing id without conflicts in 2 batches', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    const ids: string[] = await storeStatements([createStatement({ id: TEST_ID })]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID]);
  });

  it('should not store statements when they use an existing id with conflicts in 2 batches', async () => {
    try {
      await storeStatements([createStatement({ id: TEST_ID })]);
      await storeStatements([createStatement({
        id: TEST_ID,
        actor: {mbox: 'mailto:test2@example.com'},
      })]);
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, Conflict);
    }
  });

  it('should store statements when they use an existing id without conflicts in 1 batch', async () => {
    const ids: string[] = await storeStatements([
      createStatement({ id: TEST_ID }),
      createStatement({ id: TEST_ID }),
    ]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID, TEST_ID]);
  });

  it('should not store statements when they use an existing id with conflicts in 1 batch', async () => {
    try {
      await storeStatements([
        createStatement({ id: TEST_ID }),
        createStatement({
          id: TEST_ID,
          actor: {mbox: 'mailto:test2@example.com'},
        }),
      ]);
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, Conflict);
    }
  });
});
