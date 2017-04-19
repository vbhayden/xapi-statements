import setupIdsTest from './setupIdsTest';

const createExactActor = (ifi: any): any => {
  return {
    name: 'Test1',
    ...createIdsActor(ifi),
  };
};

const createIdsActor = (ifi: any): any => {
  return {
    objectType: 'Agent',
    ...ifi,
  };
};

export default (createActorStatement: (actor: any) => any) => {
  const assertIdsStatements = setupIdsTest();

  const assertIdsActor = async (ifi: any) => {
    const exactStatement = createActorStatement(createExactActor(ifi));
    const expectedStatement = createActorStatement(createIdsActor(ifi));
    await assertIdsStatements(exactStatement, expectedStatement);
  };

  it('should return statements when they match the account name', async () => {
    const account = { name: 'testname', homePage: 'http://www.example.com' };
    await assertIdsActor({ account });
  });

  it('should return statements when they match the mbox', async () => {
    const mbox = 'mailto:test@example.com';
    await assertIdsActor({ mbox });
  });

  it('should return statements when they match the mbox_sha1sum', async () => {
    const mbox_sha1sum = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
    await assertIdsActor({ mbox_sha1sum });
  });

  it('should return statements when they match the openid', async () => {
    const openid = 'http://www.example.com';
    await assertIdsActor({ openid });
  });
};
