import * as assert from 'assert';
import getActivities from '../../../service/storeStatements/queriables/getActivities';

const ACTIVITY_ID = 'http://example.org/test-activity';
const ACTIVITY_ID2 = 'http://example.org/test-activity2';
const ACTIVITY_ID3 = 'http://example.org/test-activity3';

const agent =  {
  objectType: 'Agent',
  mbox: 'mailto:test@test.com'
};
const activity = {
  objectType: 'Activity',
  id: ACTIVITY_ID
};
const activity2 = {
  objectType: 'Activity',
  id: ACTIVITY_ID2
};

const agentObjectModel = {
  statement: {
    object: agent
  }
};

const activityObjectmodel = {
  statement: {
    object: activity,
    context: {
      contextActivities: {
        parent: activity,
        grouping: [
          agent,
          activity,
          activity,
          activity2
        ],
        category: {},
        other: []
      }
    }
  }
};

describe.only('create array of queriable activities', () => {
  it('should return the object.id from a statement with an Activity as object', () => {
    const activities = getActivities(activityObjectmodel);
    assert.deepEqual(activities, [ACTIVITY_ID]);
  });

  it('should return a blank array from a statement with an Agent as object', () => {
    const activities = getActivities(agentObjectModel);
    assert.deepEqual(activities, []);
  });

  it('should return the correct IDs from a subpath', () => {
    const parentActivities = getActivities(
      activityObjectmodel,
      ['statement', 'context', 'contextActivities', 'parent']
    );
    const groupingActivities = getActivities(
      activityObjectmodel,
      ['statement', 'context', 'contextActivities', 'grouping']
    );
    const categoryActivities = getActivities(
      activityObjectmodel,
      ['statement', 'context', 'contextActivities', 'category']
    );
    const otherActivities = getActivities(
      activityObjectmodel,
      ['statement', 'context', 'contextActivities', 'other']
    );
    // assert.deepEqual(parentActivities, [ACTIVITY_ID], 'parent mismatch');
    assert.deepEqual(groupingActivities, [ACTIVITY_ID, ACTIVITY_ID2], 'grouping mismatch');
    // assert.deepEqual(categoryActivities, [], 'category mismatch');
    // assert.deepEqual(otherActivities, [], 'other mismatch');
  });
});
