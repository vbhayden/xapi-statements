import * as assert from 'assert';
import createStatement from '../utils/createStatement';
import createClientModel from '../utils/createClientModel';
import setup from '../utils/setup';

const TEST_ACTIVITY_ID = 'http://www.example.org/fullActivityTest';
const TEST_IMMUTABLE_ACTIVITY_ID = 'http://www.example.org/fullActivityTest/immutable';
const TEST_CLIENT = createClientModel();
const TEST_BASE_ACTIVITY = {
  objectType: 'Activity',
  id: TEST_ACTIVITY_ID,
  definition: {
    name: {},
    description: {},
  },
};
const TEST_ACTIVITY = {
  ...TEST_BASE_ACTIVITY,
  definition: {
    name: {
      'en-GB': 'test_gb_name',
    },
    description: {
      'en-GB': 'test_gb_description',
    },
  },
};
const TEST_MERGE_ACTIVITY = {
  ...TEST_BASE_ACTIVITY,
  definition: {
    name: {
      'en-US': 'test_us_name',
    },
    description: {
      'en-US': 'test_us_description',
    },
  },
};
const TEST_IMMUTABLE_ACTIVITY = {
  ...TEST_MERGE_ACTIVITY,
  id: TEST_IMMUTABLE_ACTIVITY_ID,
};
const TEST_MERGED_ACTIVITY = {
  ...TEST_BASE_ACTIVITY,
  definition: {
    name: {
      ...TEST_ACTIVITY.definition.name,
      ...TEST_MERGE_ACTIVITY.definition.name,
    },
    description: {
      ...TEST_ACTIVITY.definition.description,
      ...TEST_MERGE_ACTIVITY.definition.description,
    }
  }
};

describe('getFullActivity', () => {
  const service = setup();

  it('should return the activity ID when getting a non-existing activity', async () => {
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_BASE_ACTIVITY);
  });

  it('should also return the definition when getting a existing activity', async () => {
    const statement = createStatement({ object: TEST_ACTIVITY });
    await service.storeStatements({
      models: [statement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_ACTIVITY);
  });

  it('should merge the definitions when storing two definitions in one batch', async () => {
    const initialStatement = createStatement({ object: TEST_ACTIVITY });
    const mergeStatement = createStatement({ object: TEST_MERGE_ACTIVITY });
    await service.storeStatements({
      models: [initialStatement, mergeStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_MERGED_ACTIVITY);
  });

  it('should merge the definitions when storing two definitions in two batches', async () => {
    const initialStatement = createStatement({ object: TEST_ACTIVITY });
    const mergeStatement = createStatement({ object: TEST_MERGE_ACTIVITY });
    await service.storeStatements({
      models: [initialStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    await service.storeStatements({
      models: [mergeStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_MERGED_ACTIVITY);
  });

  it('should merge with existing activities when storing a different ID', async () => {
    const existingActivityStatement = createStatement({ object: TEST_IMMUTABLE_ACTIVITY });
    const initialStatement = createStatement({ object: TEST_ACTIVITY });
    const mergeStatement = createStatement({ object: TEST_MERGE_ACTIVITY });
    await service.storeStatements({
      models: [initialStatement, existingActivityStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    await service.storeStatements({
      models: [mergeStatement],
      attachments: [],
      client: TEST_CLIENT,
    });
    const fullActivity = await service.getFullActivity({
      activityId: TEST_ACTIVITY_ID,
      client: TEST_CLIENT,
    });
    assert.deepEqual(fullActivity, TEST_MERGED_ACTIVITY);
  });
});
