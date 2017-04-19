import * as assert from 'assert';
import { isArray, merge } from 'lodash';
import setup from '../../utils/setup';
import createStatement from '../../utils/createStatement';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_LANG_1 = 'en-GB';
const TEST_LANG_2 = 'en-US';
const TEST_LANG_3 = 'en';
const TEST_TEXT_1 = 'test1';
const TEST_TEXT_2 = 'test2';

export default (createActivityStatement: (definition: any) => any) => {
  const service = setup();

  const storeStatements = (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };

  const assertCanonicalStatement = async (
    exactStatement: any,
    canonicalStatement: any,
    langs: string[]
  ): Promise<void> => {
    await storeStatements([exactStatement]);
    const canonicalStatements = await service.getCanonicalStatements({ langs });
    const expectedStatement = merge(canonicalStatements[0], canonicalStatement);
    assert(isArray(canonicalStatements));
    assert.equal(canonicalStatements.length, 1);
    assert.deepEqual(canonicalStatements[0], expectedStatement);
  };

  const assertCanonicalLangMap = async (
    createWithLangMap: (langMap: any) => any,
    exactLangMap: any,
    canonicalLangMap: any,
    langs: string[]
  ): Promise<void> => {
    const exactStatement = createStatement({
      id: TEST_ID,
      ...createWithLangMap(exactLangMap),
    });
    const canonicalStatement = createStatement({
      id: TEST_ID,
      ...createWithLangMap(canonicalLangMap),
    });
    await assertCanonicalStatement(exactStatement, canonicalStatement, langs);
  };

  const assertCanonicalWithMatchingLangs = async (
    createWithLangMap: (langMap: any) => any
  ): Promise<void> => {
    await assertCanonicalLangMap(createWithLangMap, {
      [TEST_LANG_1]: TEST_TEXT_1,
      [TEST_LANG_2]: TEST_TEXT_2,
    }, {
      [TEST_LANG_1]: TEST_TEXT_1,
    }, [TEST_LANG_2, TEST_LANG_1]);
  };

  const assertCanonicalWithoutMatchingLangs = async (
    createWithLangMap: (langMap: any) => any
  ): Promise<void> => {
    const langMap = {
      [TEST_LANG_1]: TEST_TEXT_1,
      [TEST_LANG_2]: TEST_TEXT_2,
    };
    await assertCanonicalLangMap(createWithLangMap, langMap, langMap, [TEST_LANG_3]);
  };

  it('should return the canonical activity name when langs match', async () => {
    await assertCanonicalWithMatchingLangs((name: any) => {
      return createActivityStatement({ name });
    });
  });

  it('should return the canonical activity description when langs match', async () => {
    await assertCanonicalWithMatchingLangs((description: any) => {
      return createActivityStatement({ description });
    });
  });

  it('should return the original activity name when langs are not matching', async () => {
    await assertCanonicalWithoutMatchingLangs((name: any) => {
      return createActivityStatement({ name });
    });
  });

  it('should return the original activity description when langs are not matching', async () => {
    await assertCanonicalWithoutMatchingLangs((description: any) => {
      return createActivityStatement({ description });
    });
  });
};
