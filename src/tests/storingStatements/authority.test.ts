import * as assert from 'assert';
import Actor from '../../models/Actor';
import setup from '../utils/setup';
import createClientModel from '../utils/createClientModel';
import storeAwaitedStatements from '../utils/storeAwaitedStatements';
import createStatement from '../utils/createStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_AUTHORITY: Actor = {
  objectType: 'Agent',
  mbox: 'mailto:test@example.com',
};

describe('store statement authority', () => {
  const service = setup();
  const storeStatements = (statements: any[], authority: Actor): Promise<string[]> => {
    return storeAwaitedStatements(service)({
      models: statements,
      attachments: [],
      client: createClientModel(authority),
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
