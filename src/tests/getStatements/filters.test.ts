import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';

describe('get statement', () => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  it('should return statements when they match the verb', async () => {
    const verbId1 = 'http://www.example.com/verb1';
    const verbId2 = 'http://www.example.com/verb2';
    await storeStatements([
      createStatement({ verb: { id: verbId1 }}),
      createStatement({ verb: { id: verbId2 }}),
    ]);
    const statements = await service.getExactStatements({
      verb: verbId1,
    });
    assert(isArray(statements));
    assert.equal(statements.length, 1);
    assert.equal(statements[0].verb.id, verbId1);
  });
});
