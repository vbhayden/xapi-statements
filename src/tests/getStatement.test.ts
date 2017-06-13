import * as assert from 'assert';
import NoModel from '../errors/NoModel';
import setup from './utils/setup';
import createStatement from './utils/createStatement';
import createClientModel from './utils/createClientModel';
import createVoidingStatement from './utils/createVoidingStatement';
import storeStatementsInService from './utils/storeStatementsInService';
import assertError from './utils/assertError';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_VOIDER = createVoidingStatement(TEST_ID);
const TEST_CLIENT = createClientModel();

describe('get statement', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertVoided = async () => {
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT })
    );
    const voidedStatement = await service.getStatement({
      id: TEST_ID,
      voided: true,
      client: TEST_CLIENT,
    });
    assert.equal(voidedStatement.id, TEST_ID);
  };

  it('should throw an error when the statement does not exist', async () => {
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT })
    );
  });

  it('should throw an error when the voider is not voided ', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: true, client: TEST_CLIENT })
    );
  });

  it('should throw an error when the voider does not exist', async () => {
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: true, client: TEST_CLIENT })
    );
  });

  it('should void a statement when it is voided in a following batch', async () => {
    await storeStatements([TEST_STATEMENT]);
    await storeStatements([TEST_VOIDER]);
    await assertVoided();
  });

  it('should void a statement when it is voided in a previous batch', async () => {
    await storeStatements([TEST_VOIDER]);
    await storeStatements([TEST_STATEMENT]);
    await assertVoided();
  });

  it('should void a statement when it is voided earlier in the same batch', async () => {
    await storeStatements([TEST_VOIDER, TEST_STATEMENT]);
    await assertVoided();
  });

  it('should void a statement when it is voided later in the same batch', async () => {
    await storeStatements([TEST_STATEMENT, TEST_VOIDER]);
    await assertVoided();
  });
});
