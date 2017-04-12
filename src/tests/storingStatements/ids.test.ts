import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';

describe('store statement ids', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  it('should use existing id when they have an id', async () => {
    const ids: string[] = await storeStatements([createStatement({ id: TEST_ID })]);
    assert.equal(isArray(ids), true);
    assert.deepEqual(ids, [TEST_ID]);
  });

  it('should generate an id when they have no id', async () => {
    const ids: string[] = await storeStatements([createStatement()]);
    assert.equal(isArray(ids), true);
    assert.equal(ids.length, 1);
  });
});
