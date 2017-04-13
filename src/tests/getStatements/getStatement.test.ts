import * as assert from 'assert';
import setup from '../utils/setup';
import NoModel from '../../errors/NoModel';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';

describe('get statement', () => {
  const service = setup();

  const getStatement = () => {
    return service.getStatement({ id: TEST_ID, voided: false });
  };

  it('should throw an error when statement does not exist', async () => {
    try {
      await getStatement();
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, NoModel);
    }
  });
});
