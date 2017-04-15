import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../../utils/setup';
import createStatement from '../../utils/createStatement';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';

export default (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  const createActorStatement = (id: string, actor: any): any => {
    return createStatement({ id, ...createActor(actor) });
  };

  const assertFilter = async (actor1: any, actor2: any) => {
    const statement1 = createActorStatement(TEST_ID_1, actor1);
    const statement2 = createActorStatement(TEST_ID_2, actor2);
    await storeStatements([statement1, statement2]);
    const filteredStatements = await service.getExactStatements({
      agent: actor1,
      relatedAgents,
    });
    assert(isArray(filteredStatements));
    assert.equal(filteredStatements.length, 1);
    assert.deepEqual(filteredStatements[0].id, TEST_ID_1);
  };

  it('should return statements when they match the account name', async () => {
    const account1 = { name: '1', homePage: 'http://www.example.com' };
    const account2 = { name: '2', homePage: 'http://www.example.com' };
    await assertFilter({ account: account1 }, { account: account2 });
  });

  it('should return statements when they match the account homepage', async () => {
    const account1 = { name: 'test', homePage: 'http://www.example.com/1' };
    const account2 = { name: 'test', homePage: 'http://www.example.com/2' };
    await assertFilter({ account: account1 }, { account: account2 });
  });

  it('should return statements when they match the mbox', async () => {
    const mbox1 = 'mailto:test1@example.com';
    const mbox2 = 'mailto:test2@example.com';
    await assertFilter({ mbox: mbox1 }, { mbox: mbox2 });
  });

  it('should return statements when they match the mbox_sha1sum', async () => {
    const mbox_sha1sum1 = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
    const mbox_sha1sum2 = 'e1f9bc64eefbdf3660690684c6184f594f9a5c18';
    await assertFilter({ mbox_sha1sum: mbox_sha1sum1 }, { mbox_sha1sum: mbox_sha1sum2 });
  });

  it('should return statements when they match the openid', async () => {
    const openid1 = 'http://www.example.com/1';
    const openid2 = 'http://www.example.com/2';
    await assertFilter({ openid: openid1 }, { openid: openid2 });
  });
};
