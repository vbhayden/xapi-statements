import * as assert from 'assert';
import { isArray } from 'lodash';
import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

describe('get statements by filters', () => {
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
    const targetVerbId = 'http://www.example.com/verb1';
    const missingVerbId = 'http://www.example.com/verb2';
    const statements = await filterStatements([
      createStatement({ verb: { id: targetVerbId }}),
      createStatement({ verb: { id: missingVerbId }}),
    ], {
      verb: targetVerbId,
    });
    assert.equal(statements[0].verb.id, targetVerbId);
  });

  it('should return statements when they match the registration', async () => {
    const targetReg = '1c86d8e9-f325-404f-b3d9-24c451035583';
    const missingReg = '1c86d8e9-f325-404f-b3d9-24c451035584';
    const statements = await filterStatements([
      createStatement({ context: { registration: targetReg }}),
      createStatement({ context: { registration: missingReg }}),
    ], {
      registration: targetReg,
    });
    const context = statements[0].context;
    if (context !== undefined) {
      assert.equal(context.registration, targetReg);
    } else {
      assert(false, 'Expected context to be defined');
    }
  });
});
