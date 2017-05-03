import * as assert from 'assert';
import NoModel from '../errors/NoModel';
import setup from './utils/setup';
import createStatement from './utils/createStatement';
import storeStatementsInService from './utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';

describe('get statement', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should throw an error when the statement does not exist', async () => {
    try {
      await service.getStatement({ id: TEST_ID, voided: false });
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, NoModel);
    }
  });

  it('should throw an error when the voider is not voided ', async () => {
    try {
      await storeStatements([createStatement({ id: TEST_ID })]);
      await service.getStatement({ id: TEST_ID, voided: true });
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, NoModel);
    }
  });

  it('should throw an error when the voider does not exist', async () => {
    try {
      await service.getStatement({ id: TEST_ID, voided: true });
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, NoModel);
    }
  });
});
