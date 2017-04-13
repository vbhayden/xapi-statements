import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_TIMESTAMP = '2017-04-12T15:37:35+00:00';

describe('store statement timestamp', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  it('should use existing timestamp when timestamp is set', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      timestamp: TEST_TIMESTAMP,
    })]);
    const statement = await service.getStatement({ id: TEST_ID, voided: false });
    assert.equal(statement.timestamp, TEST_TIMESTAMP);
  });

  it('should generate a timestamp when timestamp is not set', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    const statement = await service.getStatement({ id: TEST_ID, voided: false });
    assert.equal(statement.timestamp, statement.stored);
  });
});
