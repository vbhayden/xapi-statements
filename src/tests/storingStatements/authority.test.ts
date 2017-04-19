import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_AUTHORITY = { mbox: 'mailto:test@example.com' };

describe('store statement authority', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = () => {
    return service.getStatement({ id: TEST_ID, voided: false });
  };

  it('should generate an authority when authority is set', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      authority: TEST_AUTHORITY,
    })]);
    const statement = await getStatement();
    assert(statement.authority !== undefined);
    assert.notEqual(statement.authority.mbox, TEST_AUTHORITY.mbox);
  });

  it('should generate an authority when authority is not set', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    const statement = await getStatement();
    assert(statement.authority !== undefined);
  });
});
