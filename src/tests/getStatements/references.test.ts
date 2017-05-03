import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_A = '1c86d8e9-f325-404f-b3d9-24c45103558A';
const TEST_ID_B = '1c86d8e9-f325-404f-b3d9-24c45103558B';
const TEST_ID_C = '1c86d8e9-f325-404f-b3d9-24c45103558C';
const TEST_ID_D = '1c86d8e9-f325-404f-b3d9-24c45103558D';
// const TEST_ID_E = '1c86d8e9-f325-404f-b3d9-24c45103558E';

describe('get statements by references', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const createTargetingStatement = (sourceId: string, targetId: string) => {
    return createStatement({
      id: sourceId,
      actor: {
        objectType: 'Agent',
        account: {
          homePage: 'http://www.example.com',
          name: sourceId,
        },
      },
      object: {
        objectType: 'StatementRef',
        id: targetId,
      },
    });
  };

  const getTargetingStatement = (targetId: string) => {
    return service.getExactStatements({
      agent: {
        account: {
          homePage: 'http://www.example.com',
          name: targetId,
        },
      },
    });
  };

  const assertTargetingStatement = async (targetId: string, expectedIds: string[]) => {
    const statements = await getTargetingStatement(targetId);
    assert(isArray(statements));
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
  };

  it('should return no statements when targeted statement is not stored', async () => {
    await storeStatements([
      createTargetingStatement(TEST_ID_A, TEST_ID_B),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A]);
    await assertTargetingStatement(TEST_ID_B, []);
  });

  it('should return both statements when they reference each other in one batch', async () => {
    await storeStatements([
      createTargetingStatement(TEST_ID_A, TEST_ID_B),
      createTargetingStatement(TEST_ID_B, TEST_ID_A),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A, TEST_ID_B]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_A, TEST_ID_B]);
  });

  it('should return both statements when they reference each other in two batches', async () => {
    await storeStatements([
      createTargetingStatement(TEST_ID_A, TEST_ID_B),
    ]);
    await storeStatements([
      createTargetingStatement(TEST_ID_B, TEST_ID_A),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A, TEST_ID_B]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_A, TEST_ID_B]);
  });

  it('should return three statements when two target one', async () => {
    await storeStatements([
      createTargetingStatement(TEST_ID_A, TEST_ID_C),
      createTargetingStatement(TEST_ID_B, TEST_ID_C),
      createTargetingStatement(TEST_ID_C, TEST_ID_D),
    ]);
    await assertTargetingStatement(TEST_ID_C, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_B]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A]);
  });

  it('should return all statements when the references cycle', async () => {
    await storeStatements([
      createTargetingStatement(TEST_ID_A, TEST_ID_B),
      createTargetingStatement(TEST_ID_B, TEST_ID_C),
      createTargetingStatement(TEST_ID_C, TEST_ID_A),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
    await assertTargetingStatement(TEST_ID_C, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
  });
});
