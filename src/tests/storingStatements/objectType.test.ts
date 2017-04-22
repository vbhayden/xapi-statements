import * as assert from 'assert';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createContext from '../utils/createContext';
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

  const storeStatement = async (statement: any) => {
    await storeStatements([createStatement({
      id: TEST_ID,
      ...statement,
    })]);
    return getStatement();
  };

  it('should generate an objectType in actor', async () => {
    const statement = await storeStatement({ actor: TEST_AGENT });
    assert.equal(statement.actor.objectType, 'Agent');
  });

  it('should generate an objectType in object', async () => {
    await storeStatement({ object: TEST_ACTIVITY });
    const statement = await getStatement();
    assert.equal(statement.object.objectType, 'Activity');
  });

  it('should generate an objectType in actor member', async () => {
    const statement = await storeStatement({
      actor: {
        objectType: 'Group',
        ...TEST_AGENT,
        member: [TEST_AGENT],
      },
    });
    const expectedObjectType = 'Agent';
    const actualObjectType = (
      statement.actor.objectType === 'Group' &&
      statement.actor.member !== undefined &&
      statement.actor.member.length === 1
    ) ? statement.actor.member[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in object member', async () => {
    const statement = await storeStatement({
      object: {
        objectType: 'Group',
        ...TEST_AGENT,
        member: [TEST_AGENT],
      },
    });
    const expectedObjectType = 'Agent';
    const actualObjectType = (
      statement.object.objectType === 'Group' &&
      statement.object.member !== undefined &&
      statement.object.member.length === 1
    ) ? statement.object.member[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in instructor', async () => {
    const statement = await storeStatement({
      context: {
        instructor: TEST_AGENT,
      },
    });
    const expectedObjectType = 'Agent';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.instructor !== undefined
    ) ? statement.context.instructor.objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in team', async () => {
    const statement = await storeStatement({
      context: {
        team: TEST_AGENT,
      },
    });
    const expectedObjectType = 'Group';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.team !== undefined
    ) ? statement.context.team.objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in team member', async () => {
    const statement = await storeStatement({
      context: {
        team: {
          objectType: 'Group',
          ...TEST_AGENT,
          member: [TEST_AGENT],
        },
      },
    });
    const expectedObjectType = 'Agent';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.team !== undefined &&
      statement.context.team.objectType === 'Group' &&
      statement.context.team.member !== undefined &&
      statement.context.team.member.length === 1
    ) ? statement.context.team.member[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in parent', async () => {
    const statement = await storeStatement(createContext({ parent: [TEST_ACTIVITY] }));
    const expectedObjectType = 'Activity';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.contextActivities !== undefined &&
      statement.context.contextActivities.parent !== undefined &&
      statement.context.contextActivities.parent.length === 1
    ) ? statement.context.contextActivities.parent[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in grouping', async () => {
    const statement = await storeStatement(createContext({ grouping: [TEST_ACTIVITY] }));
    const expectedObjectType = 'Activity';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.contextActivities !== undefined &&
      statement.context.contextActivities.grouping !== undefined &&
      statement.context.contextActivities.grouping.length === 1
    ) ? statement.context.contextActivities.grouping[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in category', async () => {
    const statement = await storeStatement(createContext({ category: [TEST_ACTIVITY] }));
    const expectedObjectType = 'Activity';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.contextActivities !== undefined &&
      statement.context.contextActivities.category !== undefined &&
      statement.context.contextActivities.category.length === 1
    ) ? statement.context.contextActivities.category[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });

  it('should generate an objectType in other', async () => {
    const statement = await storeStatement(createContext({ other: [TEST_ACTIVITY] }));
    const expectedObjectType = 'Activity';
    const actualObjectType = (
      statement.context !== undefined &&
      statement.context.contextActivities !== undefined &&
      statement.context.contextActivities.other !== undefined &&
      statement.context.contextActivities.other.length === 1
    ) ? statement.context.contextActivities.other[0].objectType : undefined;
    assert.equal(actualObjectType, expectedObjectType);
  });
});
