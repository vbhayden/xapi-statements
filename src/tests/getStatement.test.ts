import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModel from 'jscommons/dist/errors/NoModel';
import setup from './utils/setup';
import createStatement from './utils/createStatement';
import createClientModel from './utils/createClientModel';
import createVoidingStatement from './utils/createVoidingStatement';
import storeStatementsInService from './utils/storeStatementsInService';
import Actor from '../models/Actor';

const LRS2_ID = '5988f0f00000000000000002';
const LRS2_AUTHORITY: Actor = {
  objectType: 'Agent',
  mbox: 'mailto:lrs2@test.com'
};
const LRS2_CLIENT = createClientModel({
  lrs_id: LRS2_ID,
  authority: LRS2_AUTHORITY
});

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_VOIDER = createVoidingStatement(TEST_ID);
const TEST_CLIENT = createClientModel();

describe('get statement', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertVoided = async () => {
    const promise = service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    await assertError(NoModel, promise);
    const result = await service.getStatement({
      id: TEST_ID,
      voided: true,
      client: TEST_CLIENT
    });
    const voidedStatement = result.statements[0];
    assert.equal(voidedStatement.id, TEST_ID);
  };

  it('should throw an error when the statement does not exist', async () => {
    const promise = service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    await assertError(NoModel, promise);
  });

  it('should throw an error when the voider is not voided ', async () => {
    await storeStatements([TEST_STATEMENT]);
    const promise = service.getStatement({ id: TEST_ID, voided: true, client: TEST_CLIENT });
    await assertError(NoModel, promise);
  });

  it('should throw an error when the voider does not exist', async () => {
    const promise = service.getStatement({ id: TEST_ID, voided: true, client: TEST_CLIENT });
    await assertError(NoModel, promise);
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

  it('should return the correct statement when the ids are the same across 2 different stores', async () => {
    const LRS2_STATEMENT_INSERT = createStatement({
      id: TEST_ID
    });
    await storeStatements([TEST_STATEMENT], [], TEST_CLIENT);
    await storeStatements([LRS2_STATEMENT_INSERT], [], LRS2_CLIENT);
    const LRS1_STATEMENT = await service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT });
    const LRS2_STATEMENT = await service.getStatement({ id: TEST_ID, voided: false, client: LRS2_CLIENT });

    assert.equal(LRS1_STATEMENT.statements[0].authority.mbox, TEST_CLIENT.authority.mbox);
    assert.equal(LRS2_STATEMENT.statements[0].authority.mbox, LRS2_CLIENT.authority.mbox);
  });
});
