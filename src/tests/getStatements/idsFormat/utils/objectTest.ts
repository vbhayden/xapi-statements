import createStatement from '../../../utils/createStatement';
import activityFormatTest from './activityFormatTest';
import actorTest from './actorTest';
import setupIdsTest from './setupIdsTest';

const TEST_REF_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';

export default (createObjectStatement: (object: any) => any) => {
  describe('activity', () => {
    activityFormatTest(createObjectStatement);
  });
  actorTest(createObjectStatement);
  describe('statement ref', () => {
    const assertIdsStatements = setupIdsTest();

    it('should not change the format when using a StatementRef', async () => {
      const statement = createStatement(createObjectStatement({
        objectType: 'StatementRef',
        id: TEST_REF_ID,
      }));
      await assertIdsStatements(statement, statement);
    });
  });
};
