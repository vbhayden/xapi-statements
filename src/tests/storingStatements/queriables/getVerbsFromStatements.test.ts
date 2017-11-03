import * as assert from 'assert';
import getVerbsFromStatements from '../../../service/storeStatements/queriables/getVerbsFromStatement';

const VERB_ID = 'http://example.org/test-verb';

const model = {
  verb: {
    id: VERB_ID
  }
};

describe('create array of queriable verbs', () => {
  it('should return the verb from the statement', () => {
    const verbs = getVerbsFromStatements(model);
    assert.deepEqual(verbs, [VERB_ID]);
  });
});
