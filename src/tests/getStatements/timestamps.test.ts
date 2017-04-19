import * as assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';

type TimestampFilter = (timestamp: string) => GetStatementsOptions;

describe('get statement timestamps', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatements = (opts: GetStatementsOptions) => {
    return service.getExactStatements(opts);
  };

  const storeStatement = (id: string): Promise<string[]> => {
    return storeStatements([ createStatement({
      id,
      timestamp: '2017-04-18T00:00Z',
    }) ]);
  };

  const filterStatements = async (filter: TimestampFilter) => {
    await storeStatement(TEST_ID_1);
    await (new Promise((resolve) => setTimeout(resolve, 1)));
    await storeStatement(TEST_ID_2);
    const statement = await service.getStatement({ id: TEST_ID_1, voided: false });
    const filteredStatements = await getStatements(filter(statement.stored));
    assert(isArray(filteredStatements));
    assert.equal(filteredStatements.length, 1);
    return filteredStatements;
  };

  it('should return statements when they match the since', async () => {
    const statements = await filterStatements((since: string) => {
      return { since };
    });
    assert.equal(statements[0].id, TEST_ID_2);
  });

  it('should return statements when they match the until', async () => {
    const statements = await filterStatements((until: string) => {
      return { until };
    });
    assert.equal(statements[0].id, TEST_ID_1);
  });
});
