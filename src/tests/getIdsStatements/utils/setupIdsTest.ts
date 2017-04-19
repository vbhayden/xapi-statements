import * as assert from 'assert';
import { isArray, merge } from 'lodash';
import setup from '../../utils/setup';
import storeStatementsInService from '../../utils/storeStatementsInService';

export default () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  return async (
    exactStatement: any,
    canonicalStatement: any
  ): Promise<void> => {
    await storeStatements([exactStatement]);
    const actualStatements = await service.getIdsStatements({});
    const expectedStatement = {...actualStatements[0], ...canonicalStatement};
    assert(isArray(actualStatements));
    assert.equal(actualStatements.length, 1);
    assert.deepEqual(actualStatements[0], expectedStatement);
  };
};
