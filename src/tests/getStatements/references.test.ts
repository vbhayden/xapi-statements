import FilterAgent from '../../models/FilterAgent';
import setup from '../utils/setup';
import storeStatementsInService from '../utils/storeStatementsInService';
import createReferenceStatement from './utils/createReferenceStatement';
import assertFilteredStatements from './utils/assertFilteredStatements';
import delay from './utils/delay';

const TEST_ID_A = '1c86d8e9-f325-404f-b3d9-24c45103558A';
const TEST_ID_B = '1c86d8e9-f325-404f-b3d9-24c45103558B';
const TEST_ID_C = '1c86d8e9-f325-404f-b3d9-24c45103558C';
const TEST_ID_D = '1c86d8e9-f325-404f-b3d9-24c45103558D';

describe('get statements by references', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const createAgentFilter = (targetId: string): FilterAgent => {
    return {
      account: {
        homePage: 'http://www.example.com',
        name: targetId,
      },
    };
  };

  const assertTargetingStatement = (targetId: string, expectedIds: string[]) => {
    return assertFilteredStatements(service)({
      agent: createAgentFilter(targetId),
    }, expectedIds);
  };

  it('should return no statements when targeted statement is not stored', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A]);
    await assertTargetingStatement(TEST_ID_B, []);
  });

  it('should return both statements when they reference each other in one batch', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
      createReferenceStatement(TEST_ID_B, TEST_ID_A),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A, TEST_ID_B]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_A, TEST_ID_B]);
  });

  it('should return both statements when they reference each other in two batches', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
    ]);
    await storeStatements([
      createReferenceStatement(TEST_ID_B, TEST_ID_A),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A, TEST_ID_B]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_A, TEST_ID_B]);
  });

  it('should return three statements when two target one', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_C),
      createReferenceStatement(TEST_ID_B, TEST_ID_C),
      createReferenceStatement(TEST_ID_C, TEST_ID_D),
    ]);
    await assertTargetingStatement(TEST_ID_C, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_B]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A]);
  });

  it('should return all statements when the references cycle', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
      createReferenceStatement(TEST_ID_B, TEST_ID_C),
      createReferenceStatement(TEST_ID_C, TEST_ID_A),
    ]);
    await assertTargetingStatement(TEST_ID_A, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
    await assertTargetingStatement(TEST_ID_B, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
    await assertTargetingStatement(TEST_ID_C, [TEST_ID_A, TEST_ID_B, TEST_ID_C]);
  });

  it('should not return the source when the since option excludes it', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
    ]);
    await delay(1);
    await storeStatements([
      createReferenceStatement(TEST_ID_B, TEST_ID_A),
    ]);
    const statement = await service.getStatement({ id: TEST_ID_A, voided: false });
    await assertFilteredStatements(service)({
      agent: createAgentFilter(TEST_ID_B),
      since: statement.stored,
    }, [TEST_ID_B]);
  });

  it('should not return the target when the until option excludes it', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
    ]);
    await delay(1);
    await storeStatements([
      createReferenceStatement(TEST_ID_B, TEST_ID_A),
    ]);
    const statement = await service.getStatement({ id: TEST_ID_A, voided: false });
    await assertFilteredStatements(service)({
      agent: createAgentFilter(TEST_ID_B),
      until: statement.stored,
    }, [TEST_ID_A]);
  });

  it('should not return the target when the limit option excludes it', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
      createReferenceStatement(TEST_ID_B, TEST_ID_A),
    ]);
    await assertFilteredStatements(service)({
      agent: createAgentFilter(TEST_ID_B),
      limit: 1,
    }, [TEST_ID_A]);
  });

  it('should not return the source when the skip option excludes it', async () => {
    await storeStatements([
      createReferenceStatement(TEST_ID_A, TEST_ID_B),
      createReferenceStatement(TEST_ID_B, TEST_ID_A),
    ]);
    await assertFilteredStatements(service)({
      agent: createAgentFilter(TEST_ID_B),
      skip: 1,
    }, [TEST_ID_B]);
  });
});
