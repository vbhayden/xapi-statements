import activityFormatTest from './activityFormatTest';
import actorTest from './actorTest';

export default (createObjectStatement: (object: any) => any) => {
  describe('activity', () => {
    activityFormatTest(createObjectStatement);
  });
  actorTest(createObjectStatement);
};
