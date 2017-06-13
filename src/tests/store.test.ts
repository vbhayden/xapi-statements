import * as assert from 'assert';
import NoModel from '../errors/NoModel';
import setup from './utils/setup';
import createStatement from './utils/createStatement';
import createClientModel from './utils/createClientModel';
import storeStatementsInService from './utils/storeStatementsInService';
import assertError from './utils/assertError';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_UNKNOWN_CLIENT = createClientModel({
  lrs_id: 'unknown_client_id',
});
const TEST_OPTIONS = {
  client: TEST_UNKNOWN_CLIENT
};

describe('get statement', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertNoStatements = (actualStatements: any) => {
    assert.deepEqual(actualStatements, []);
  };

  it('should return no statements when getting exact statements with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const statements = await service.getExactStatements(TEST_OPTIONS);
    assertNoStatements(statements);
  });

  it('should return no statements when getting canonical statements with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const statements = await service.getCanonicalStatements({
      ...TEST_OPTIONS,
      langs: [],
    });
    assertNoStatements(statements);
  });

  it('should return no statements when getting ids statements with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const statements = await service.getIdsStatements(TEST_OPTIONS);
    assertNoStatements(statements);
  });

  it('should return no statements when getting exact statements and attachments with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const results = await service.getExactStatementsWithAttachments(TEST_OPTIONS);
    const statements = results.statements;
    assertNoStatements(statements);
  });

  it('should return no statements when getting canonical statements and attachments with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const results = await service.getCanonicalStatementsWithAttachments({
      ...TEST_OPTIONS,
      langs: [],
    });
    const statements = results.statements;
    assertNoStatements(statements);
  });

  it('should return no statements when getting ids statements and attachments with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const results = await service.getIdsStatementsWithAttachments(TEST_OPTIONS);
    const statements = results.statements;
    assertNoStatements(statements);
  });

  it('should throw an error when the store does not match', async () => {
    const unknownClient = createClientModel({
      lrs_id: 'unknown_lrs_id',
    });
    await storeStatements([TEST_STATEMENT]);
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: false, client: unknownClient })
    );
  });
});