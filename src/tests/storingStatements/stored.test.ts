import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_TIMESTAMP = '2017-04-12T15:37:35+00:00';

describe('store statement stored', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = () => {
    return service.getStatement({ id: TEST_ID, voided: false });
  };

  it('should generate a stored timestamp when stored is set', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      stored: TEST_TIMESTAMP,
    })]);
    const statement = await getStatement();
    assert(statement.stored !== undefined);
    assert.notEqual(statement.stored, TEST_TIMESTAMP);
  });

  it('should generate a stored timestamp when stored is not set', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    const statement = await getStatement();
    assert(statement.stored !== undefined);
  });
});
