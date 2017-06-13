import NoModel from '../../errors/NoModel';
import * as scopes from '../../utils/scopes';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createClientModel from '../utils/createClientModel';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertError from '../utils/assertError';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });

describe('get statement with scopes', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const testReadAllScope = async (scopes: string[]) => {
    const client = createClientModel({ _id: 'test_client_b', scopes });
    await storeStatements([TEST_STATEMENT]);
    await service.getStatement({ id: TEST_ID, voided: false, client });
  };

  it('should throw an error when getting a statement created with a different client with read mine scope', async () => {
    const client = createClientModel({
      _id: 'test_client_b',
      scopes: [scopes.XAPI_STATEMENTS_READ_MINE],
    });
    await storeStatements([TEST_STATEMENT]);
    await assertError(NoModel)(
      service.getStatement({ id: TEST_ID, voided: false, client })
    );
  });

  it('should return a statement when getting a statement created with a different client with xAPI all scope', async () => {
    await testReadAllScope([scopes.XAPI_ALL]);
  });

  it('should return a statement when getting a statement created with a different client with xAPI read scope', async () => {
    await testReadAllScope([scopes.XAPI_READ]);
  });

  it('should return a statement when getting a statement created with a different client with xAPI read statements scope', async () => {
    await testReadAllScope([scopes.XAPI_STATEMENTS_READ]);
  });

  it('should return a statement when getting a statement created with a different client with read all scope', async () => {
    await testReadAllScope([scopes.ALL_READ]);
  });
});