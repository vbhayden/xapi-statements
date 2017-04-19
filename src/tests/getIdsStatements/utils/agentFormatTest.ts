import createStatement from '../../utils/createStatement';
import setupIdsTest from './setupIdsTest';

export default (createIdsActor: (ifi: any) => any) => {
  const createExactActor = (ifi: any): any => {
    return {
      name: 'Test1',
      ...createIdsActor(ifi),
    };
  };

  return (createActorStatement: (actor: any) => any) => {
    const assertIdsStatements = setupIdsTest();

    const assertIdsActor = async (ifi: any) => {
      const exactStatement = createStatement(createActorStatement(createExactActor(ifi)));
      const expectedStatement = createStatement(createActorStatement(createIdsActor(ifi)));
      await assertIdsStatements(exactStatement, expectedStatement);
    };

    it('should return the account and objectType without the name', async () => {
      const account = { name: 'testname', homePage: 'http://www.example.com' };
      await assertIdsActor({ account });
    });

    it('should return the mbox and objectType without the name', async () => {
      const mbox = 'mailto:test@example.com';
      await assertIdsActor({ mbox });
    });

    it('should return the mbox_sha1sum and objectType without the name', async () => {
      const mbox_sha1sum = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
      await assertIdsActor({ mbox_sha1sum });
    });

    it('should return the openid and objectType without the name', async () => {
      const openid = 'http://www.example.com';
      await assertIdsActor({ openid });
    });
  };
};
