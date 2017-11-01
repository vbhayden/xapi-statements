import * as assert from 'assert';
import getVerbs from '../../../service/storeStatements/queriables/getVerbs';

const VERB_ID = 'http://example.org/test-verb';
const VERB_ID2 = 'http://example.org/test-verb2';
const VERB_ID3 = 'http://example.org/test-verb3';
const model = {
  statement: {
    verb: {
      id: VERB_ID
    }
  },
  refs: [
    {
      statement: {
        verb: {
          id: VERB_ID2
        }
      }
    },
    {
      statement: {
        verb: {
          id: VERB_ID3
        }
      }
    },
    {
      statement: {
      }
    }
  ]
};

describe('create array of queriable verbs', () => {
  it('should return just the verbs from the statement', () => {
    const verbs = getVerbs(model);
    assert.deepEqual(verbs, [VERB_ID]);
  });

  it('should return verbs from the statement refs', () => {
    const verbs = getVerbs(model, ['refs']);
    assert.deepEqual(verbs, [VERB_ID2, VERB_ID3]);
  });
});
