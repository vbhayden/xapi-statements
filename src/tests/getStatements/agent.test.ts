import * as assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

describe('get statement agent', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  const getStatements = (opts: GetStatementsOptions) => {
    return service.getExactStatements(opts);
  };

  const filterStatements = async (statements: any[], opts: GetStatementsOptions) => {
    await storeStatements(statements);
    const filteredStatements = await getStatements(opts);
    assert(isArray(filteredStatements));
    assert.equal(filteredStatements.length, 1);
    return filteredStatements;
  };

  const createActorStatement = (actor: any): any => {
    return createStatement({ actor });
  };

  it('should return statements when they match the account name', async () => {
    const account1 = { name: '1', homePage: 'http://www.example.com' };
    const account2 = { name: '2', homePage: 'http://www.example.com' };
    const statements = await filterStatements([
      createActorStatement({ account: account1 }),
      createActorStatement({ account: account2 }),
    ], {
      agent: { account: account1 },
    });
    assert.deepEqual(statements[0].actor.account, account1);
  });

  it('should return statements when they match the account homepage', async () => {
    const account1 = { name: 'test', homePage: 'http://www.example.com/1' };
    const account2 = { name: 'test', homePage: 'http://www.example.com/2' };
    const statements = await filterStatements([
      createActorStatement({ account: account1 }),
      createActorStatement({ account: account2 }),
    ], {
      agent: { account: account1 },
    });
    assert.deepEqual(statements[0].actor.account, account1);
  });

  it('should return statements when they match the mbox', async () => {
    const mbox1 = 'mailto:test1@example.com';
    const mbox2 = 'mailto:test2@example.com';
    const statements = await filterStatements([
      createActorStatement({ mbox: mbox1 }),
      createActorStatement({ mbox: mbox2 }),
    ], {
      agent: { mbox: mbox1 },
    });
    assert.equal(statements[0].actor.mbox, mbox1);
  });

  it('should return statements when they match the mbox_sha1sum', async () => {
    const mbox_sha1sum1 = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
    const mbox_sha1sum2 = 'e1f9bc64eefbdf3660690684c6184f594f9a5c18';
    const statements = await filterStatements([
      createActorStatement({ mbox_sha1sum: mbox_sha1sum1 }),
      createActorStatement({ mbox_sha1sum: mbox_sha1sum2 }),
    ], {
      agent: { mbox_sha1sum: mbox_sha1sum1 },
    });
    assert.equal(statements[0].actor.mbox_sha1sum, mbox_sha1sum1);
  });

  it('should return statements when they match the openid', async () => {
    const openid1 = 'http://www.example.com/1';
    const openid2 = 'http://www.example.com/2';
    const statements = await filterStatements([
      createActorStatement({ openid: openid1 }),
      createActorStatement({ openid: openid2 }),
    ], {
      agent: { openid: openid1 },
    });
    assert.equal(statements[0].actor.openid, openid1);
  });
});
