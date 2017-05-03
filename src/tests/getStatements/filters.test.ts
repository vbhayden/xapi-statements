import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';
import assertFilteredStatements from './utils/assertFilteredStatements';

const TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_MISSING_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';

describe('get statements by filters', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const filterStatements = async (statements: any[], opts: GetStatementsOptions) => {
    await storeStatements(statements);
    await assertFilteredStatements(service)(opts, [TEST_TARGET_ID]);
  };

  it('should return statements when they match the verb', async () => {
    const targetVerbId = 'http://www.example.com/verb1';
    const missingVerbId = 'http://www.example.com/verb2';
    await filterStatements([
      createStatement({ id: TEST_TARGET_ID, verb: { id: targetVerbId }}),
      createStatement({ id: TEST_MISSING_ID, verb: { id: missingVerbId }}),
    ], {
      verb: targetVerbId,
    });
  });

  it('should return statements when they match the registration', async () => {
    const targetReg = '1c86d8e9-f325-404f-b3d9-24c451035583';
    const missingReg = '1c86d8e9-f325-404f-b3d9-24c451035584';
    await filterStatements([
      createStatement({ id: TEST_TARGET_ID, context: { registration: targetReg }}),
      createStatement({ id: TEST_MISSING_ID, context: { registration: missingReg }}),
    ], {
      registration: targetReg,
    });
  });
});
