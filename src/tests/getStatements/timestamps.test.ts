import * as assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

const TEST_TIMESTAMP_1 = '2017-04-12T15:37:35+00:00';
const TEST_TIMESTAMP_2 = '2017-04-12T15:37:36+00:00';

describe('get statement', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  const getStatements = (opts: GetStatementsOptions) => {
    return service.getExactStatements(opts);
  };

  const filterStatements = async (opts: GetStatementsOptions) => {
    await storeStatements([
      createStatement({ timestamp: TEST_TIMESTAMP_1 }),
      createStatement({ timestamp: TEST_TIMESTAMP_2 }),
    ]);
    const filteredStatements = await getStatements(opts);
    assert(isArray(filteredStatements));
    assert.equal(filteredStatements.length, 1);
    return filteredStatements;
  };

  it('should return statements when they match the since', async () => {
    const statements = await filterStatements({
      since: TEST_TIMESTAMP_1,
    });
    assert.equal(statements[0].timestamp, TEST_TIMESTAMP_2);
  });
});
