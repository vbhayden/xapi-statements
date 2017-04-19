import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_TIMESTAMP = '2017-04-12T15:37:35+00:00';

describe('store statement timestamp', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = () => {
    return service.getStatement({ id: TEST_ID, voided: false });
  };

  it('should use existing timestamp when timestamp is set', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      timestamp: TEST_TIMESTAMP,
    })]);
    const statement = await getStatement();
    assert.equal(statement.timestamp, TEST_TIMESTAMP);
  });

  it('should generate a timestamp when timestamp is not set', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    const statement = await getStatement();
    assert.equal(statement.timestamp, statement.stored);
  });
});
