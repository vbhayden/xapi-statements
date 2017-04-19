import * as assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

describe('get statement filters', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

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

  it('should return statements when they match the verb', async () => {
    const verbId1 = 'http://www.example.com/verb1';
    const verbId2 = 'http://www.example.com/verb2';
    const statements = await filterStatements([
      createStatement({ verb: { id: verbId1 }}),
      createStatement({ verb: { id: verbId2 }}),
    ], {
      verb: verbId1,
    });
    assert.equal(statements[0].verb.id, verbId1);
  });

  it('should return statements when they match the registration', async () => {
    const reg1 = '1c86d8e9-f325-404f-b3d9-24c451035583';
    const reg2 = '1c86d8e9-f325-404f-b3d9-24c451035584';
    const statements = await filterStatements([
      createStatement({ context: { registration: reg1 }}),
      createStatement({ context: { registration: reg2 }}),
    ], {
      registration: reg1,
    });
    const context = statements[0].context;
    if (context !== undefined) {
      assert.equal(context.registration, reg1);
    } else {
      assert(false, 'Expected context to be defined');
    }
  });
});
