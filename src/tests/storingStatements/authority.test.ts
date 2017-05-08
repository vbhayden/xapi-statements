import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_AUTHORITY = {
  objectType: 'Agent',
  mbox: 'mailto:test@example.com',
};

describe('store statement authority', () => {
  const service = setup();
  const storeStatements = (statements: any[], authority: any): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: [],
      authority,
    });
  };

  const getStatement = () => {
    return service.getStatement({ id: TEST_ID, voided: false });
  };

  it('should use the authority option when authority is set', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      authority: {
        objectType: 'Agent',
        mbox: 'mailto:authority@example.com',
      },
    })], TEST_AUTHORITY);
    const statement = await getStatement();
    assert.equal(statement.authority.mbox, TEST_AUTHORITY.mbox);
  });

  it('should use the authority option when authority is not set', async () => {
    await storeStatements([createStatement({
      id: TEST_ID
    })], TEST_AUTHORITY);
    const statement = await getStatement();
    assert.equal(statement.authority.mbox, TEST_AUTHORITY.mbox);
  });
});
