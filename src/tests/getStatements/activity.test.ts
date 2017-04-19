import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createContext from '../utils/createContext';
import createSubStatement from '../utils/createSubStatement';
import createSubStatementContext from '../utils/createSubStatementContext';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
const TEST_ACTIVITY_1 = 'http://www.example.com/object/1';
const TEST_ACTIVITY_2 = 'http://www.example.com/object/2';

describe('get statements by activity', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  const assertFilter = async (
    createActivity: (activity: any) => any,
    relatedActivities: boolean = false
  ) => {
    const statement1 = createStatement({
      id: TEST_ID_1,
      ...createActivity({ objectType: 'Activity', id: TEST_ACTIVITY_1 }),
    });
    const statement2 = createStatement({
      id: TEST_ID_2,
      ...createActivity({ objectType: 'Activity', id: TEST_ACTIVITY_2 }),
    });
    await storeStatements([statement1, statement2]);
    const filteredStatements = await service.getExactStatements({
      activity: TEST_ACTIVITY_1,
      relatedActivities,
    });
    assert(isArray(filteredStatements));
    assert.equal(filteredStatements.length, 1);
    assert.equal(filteredStatements[0].id, TEST_ID_1);
  };

  it('should return statements when they match the activity in the object', async () => {
    await assertFilter((object: any) => {
      return { object };
    });
  });

  it('should return statements when they match the activity in the parent', async () => {
    await assertFilter((activity: any) => {
      return createContext({ parent: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the grouping', async () => {
    await assertFilter((activity: any) => {
      return createContext({ grouping: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the category', async () => {
    await assertFilter((activity: any) => {
      return createContext({ category: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the other', async () => {
    await assertFilter((activity: any) => {
      return createContext({ other: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the sub statement object', async () => {
    await assertFilter((object: any) => {
      return createSubStatement({ object });
    }, true);
  });

  it('should return statements when they match the activity in the sub statement parent', async () => {
    await assertFilter((activity: any) => {
      return createSubStatementContext({ parent: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the sub statement grouping', async () => {
    await assertFilter((activity: any) => {
      return createSubStatementContext({ grouping: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the sub statement category', async () => {
    await assertFilter((activity: any) => {
      return createSubStatementContext({ category: [activity] });
    }, true);
  });

  it('should return statements when they match the activity in the sub statement other', async () => {
    await assertFilter((activity: any) => {
      return createSubStatementContext({ other: [activity] });
    }, true);
  });
});
