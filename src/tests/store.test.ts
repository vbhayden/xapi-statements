import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModel from 'jscommons/dist/errors/NoModel';
import Statement from '../models/Statement';
import setup from './utils/setup';
import createStatement from './utils/createStatement';
import createClientModel from './utils/createClientModel';
import storeStatementsInService from './utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_UNKNOWN_CLIENT = createClientModel({
  lrs_id: 'unknown_client_id'
});
const TEST_OPTIONS = {
  client: TEST_UNKNOWN_CLIENT
};

describe('get statement', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertNoStatements = (actualStatements: Statement[]) => {
    assert.deepEqual(actualStatements, []);
  };

  it('should return no statements when getting statements with unknown store', async () => {
    await storeStatements([TEST_STATEMENT]);
    const actualStatements = (await service.getStatements(TEST_OPTIONS)).statements;
    assertNoStatements(actualStatements as Statement[]);
  });

  it('should throw an error when the store does not match', async () => {
    const unknownClient = createClientModel({
      lrs_id: 'unknown_lrs_id'
    });
    await storeStatements([TEST_STATEMENT]);
    const promise = service.getStatement({ id: TEST_ID, voided: false, client: unknownClient });
    await assertError(NoModel, promise);
  });
});
