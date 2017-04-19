import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_AGENT = { mbox: 'mailto:test@example.com' };
const TEST_ACTIVITY = { id: 'http://www.example.com' };

describe('store statement with objectType', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const getStatement = () => {
    return service.getStatement({ id: TEST_ID, voided: false });
  };

  it('should generate an objectType in actor', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      actor: TEST_AGENT,
    })]);
    const statement = await getStatement();
    assert.equal(statement.actor.objectType, 'Agent');
  });

  it('should generate an objectType in object', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      object: TEST_ACTIVITY,
    })]);
    const statement = await getStatement();
    assert.equal(statement.object.objectType, 'Activity');
  });

  it('should generate an objectType in actor member', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      actor: {
        objectType: 'Group',
        ...TEST_AGENT,
        member: [TEST_AGENT],
      },
    })]);
    const statement = await getStatement();
    assert.equal(statement.actor.member[0].objectType, 'Agent');
  });

  it('should generate an objectType in object member', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      object: {
        objectType: 'Group',
        ...TEST_AGENT,
        member: [TEST_AGENT],
      },
    })]);
    const statement = await getStatement();
    assert.equal(statement.object.member[0].objectType, 'Agent');
  });

  it('should generate an objectType in instructor', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        instructor: TEST_AGENT,
      },
    })]);
    const statement = await getStatement();
    assert.equal(statement.context.instructor.objectType, 'Agent');
  });

  it('should generate an objectType in team', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        team: TEST_AGENT,
      },
    })]);
    const statement = await getStatement();
    assert.equal(statement.context.team.objectType, 'Group');
  });

  it('should generate an objectType in team member', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        team: {
          objectType: 'Group',
          ...TEST_AGENT,
          member: [TEST_AGENT],
        },
      },
    })]);
    const statement = await getStatement();
    assert.equal(statement.context.team.member[0].objectType, 'Agent');
  });

  it('should generate an objectType in parent', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        contextActivities: {
          parent: [TEST_ACTIVITY],
        },
      },
    })]);
    const statement = await getStatement();
    const actualObjectType = (
      statement.context.contextActivities.parent[0].objectType
    );
    const expectedObjectType = 'Activity';
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in grouping', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        contextActivities: {
          grouping: [TEST_ACTIVITY],
        },
      },
    })]);
    const statement = await getStatement();
    const actualObjectType = (
      statement.context.contextActivities.grouping[0].objectType
    );
    const expectedObjectType = 'Activity';
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in category', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        contextActivities: {
          category: [TEST_ACTIVITY],
        },
      },
    })]);
    const statement = await getStatement();
    const actualObjectType = (
      statement.context.contextActivities.category[0].objectType
    );
    const expectedObjectType = 'Activity';
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in other', async () => {
    await storeStatements([createStatement({
      id: TEST_ID,
      context: {
        contextActivities: {
          other: [TEST_ACTIVITY],
        },
      },
    })]);
    const statement = await getStatement();
    const actualObjectType = (
      statement.context.contextActivities.other[0].objectType
    );
    const expectedObjectType = 'Activity';
    assert.equal(actualObjectType, expectedObjectType);
  });
});
