import * as assert from 'assert';
import setup from '../utils/setup';
import createClientModel from '../utils/createClientModel';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_STATEMENT = createStatement();
const TEST_UNKNOWN_CLIENT = createClientModel({
  lrs_id: 'unknown_client_id',
});
const TEST_OPTIONS = {
  client: TEST_UNKNOWN_CLIENT
};

describe('get statements', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertNoStatements = (actualStatements: any) => {
    assert.deepEqual(actualStatements, []);
  };

  it('should return no statements when getting exact statements with unknown lrs', async () => {
    await storeStatements([TEST_STATEMENT]);
    const statements = await service.getExactStatements(TEST_OPTIONS);
    assertNoStatements(statements);
  });

  it('should return no statements when getting canonical statements with unknown lrs', async () => {
    await storeStatements([TEST_STATEMENT]);
    const statements = await service.getCanonicalStatements({
      ...TEST_OPTIONS,
      langs: [],
    });
    assertNoStatements(statements);
  });

  it('should return no statements when getting ids statements with unknown lrs', async () => {
    await storeStatements([TEST_STATEMENT]);
    const statements = await service.getIdsStatements(TEST_OPTIONS);
    assertNoStatements(statements);
  });

  it('should return no statements when getting exact statements and attachments with unknown lrs', async () => {
    await storeStatements([TEST_STATEMENT]);
    const results = await service.getExactStatementsWithAttachments(TEST_OPTIONS);
    const statements = results.statements;
    assertNoStatements(statements);
  });

  it('should return no statements when getting canonical statements and attachments with unknown lrs', async () => {
    await storeStatements([TEST_STATEMENT]);
    const results = await service.getCanonicalStatementsWithAttachments({
      ...TEST_OPTIONS,
      langs: [],
    });
    const statements = results.statements;
    assertNoStatements(statements);
  });

  it('should return no statements when getting ids statements and attachments with unknown lrs', async () => {
    await storeStatements([TEST_STATEMENT]);
    const results = await service.getIdsStatementsWithAttachments(TEST_OPTIONS);
    const statements = results.statements;
    assertNoStatements(statements);
  });
});
