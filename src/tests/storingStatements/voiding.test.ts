import * as assert from 'assert';
import NoModel from '../../errors/NoModel';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createVoidingStatement from '../utils/createVoidingStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';

describe('store statements voiding', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  const assertVoided = async () => {
    try {
      await service.getStatement({ id: TEST_ID, voided: false });
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, NoModel);
    }
  };

  it('should void a statement when it is voided in a following batch', async () => {
    await storeStatements([createStatement({ id: TEST_ID })]);
    await storeStatements([createVoidingStatement(TEST_ID)]);
    await assertVoided();
  });

  it('should void a statement when it is voided in a previous batch', async () => {
    await storeStatements([createVoidingStatement(TEST_ID)]);
    await storeStatements([createStatement({ id: TEST_ID })]);
    await assertVoided();
  });

  it('should void a statement when it is voided earlier in the same batch', async () => {
    await storeStatements([
      createVoidingStatement(TEST_ID),
      createStatement({ id: TEST_ID }),
    ]);
    await assertVoided();
  });

  it('should void a statement when it is voided later in the same batch', async () => {
    await storeStatements([
      createStatement({ id: TEST_ID }),
      createVoidingStatement(TEST_ID),
    ]);
    await assertVoided();
  });
});
