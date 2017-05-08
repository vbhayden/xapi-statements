import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../utils/setup';
import attachmentsTest from './utils/attachmentsTest';

describe('get statements with attachments', () => {
  const service = setup();

  const assertResult = async (result: any, expectedIds: string[], expectedAttachments: any[]) => {
    const statements: any[] = result.statements;
    const attachments: any[] = result.attachments;
    assert(isArray(attachments));
    assert(isArray(statements));
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
    assert.deepEqual(attachments, expectedAttachments);
  };

  attachmentsTest(service, async (expectedIds, expectedAttachments) => {
    const result = await service.getExactStatementsWithAttachments({});
    return assertResult(result, expectedIds, expectedAttachments);
  });

  attachmentsTest(service, async (expectedIds, expectedAttachments) => {
    const result = await service.getIdsStatementsWithAttachments({});
    return assertResult(result, expectedIds, expectedAttachments);
  });

  attachmentsTest(service, async (expectedIds, expectedAttachments) => {
    const result = await service.getCanonicalStatementsWithAttachments({});
    return assertResult(result, expectedIds, expectedAttachments);
  });
});
