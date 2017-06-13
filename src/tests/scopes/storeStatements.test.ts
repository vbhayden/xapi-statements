import { difference } from 'lodash';
import Forbidden from '../../errors/Forbidden';
import * as scopes from '../../utils/scopes';
import allScopes from '../../utils/scopes';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createClientModel from '../utils/createClientModel';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertError from '../utils/assertError';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_FORBIDDEN_SCOPES = difference(allScopes, scopes.STATEMENT_WRITE_SCOPES);

describe('store statements with scopes', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const testWriteScope = async (scopes: string[]) => {
    const client = createClientModel({ _id: 'test_client_b', scopes });
    await service.storeStatements({
      models: [],
      attachments: [],
      client,
    });
  };

  it('should create statements when using xAPI all scope', async () => {
    await testWriteScope([scopes.XAPI_ALL]);
  });

  it('should return a statement when using xAPI write statements scope', async () => {
    await testWriteScope([scopes.XAPI_STATEMENTS_WRITE]);
  });

  it('should throw an error when using a forbidden write scope', async () => {
    const client = createClientModel({
      _id: 'test_client_b',
      scopes: TEST_FORBIDDEN_SCOPES,
    });
    const promise = service.storeStatements({
      models: [],
      attachments: [],
      client,
    });
    await assertError(Forbidden)(promise);
  });
});