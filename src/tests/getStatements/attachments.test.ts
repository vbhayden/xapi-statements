import * as assert from 'assert';
import { isArray } from 'lodash';
import { Service } from '../../service';
import setup from '../utils/setup';
import createClientModel from '../utils/createClientModel';
import attachmentsTest, { StatementCreator } from './utils/attachmentsTest';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';

const TEST_CLIENT = createClientModel();

describe('get statements with attachments', () => {
  const service = setup();

  const assertResult = async (result: any, expectedIds: string[], expectedAttachments: any[]) => {
    const statements: any[] = result.statements;
    const attachments: any[] = result.attachments.map(({ stream, hash }: any) => {
      return { hash };
    });
    assert(isArray(attachments));
    assert(isArray(statements));
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
    assert.deepEqual(attachments, expectedAttachments.map(({ hash }: any) => {
      return { hash };
    }));
  };

  const testAttachments = (service: Service, createStatement: StatementCreator) => {
    describe('with exact statements', () => {
      attachmentsTest(service, async (expectedIds, expectedAttachments) => {
        const result = await service.getExactStatementsWithAttachments({
          client: TEST_CLIENT,
        });
        return assertResult(result, expectedIds, expectedAttachments);
      }, createStatement);
    });

    describe('with id statements', () => {
      attachmentsTest(service, async (expectedIds, expectedAttachments) => {
        const result = await service.getIdsStatementsWithAttachments({
          client: TEST_CLIENT,
        });
        return assertResult(result, expectedIds, expectedAttachments);
      }, createStatement);
    });

    describe('with canonical statements', () => {
      attachmentsTest(service, async (expectedIds, expectedAttachments) => {
        const result = await service.getCanonicalStatementsWithAttachments({
          langs: [],
          client: TEST_CLIENT,
        });
        return assertResult(result, expectedIds, expectedAttachments);
      }, createStatement);
    });
  };

  describe('in the statement', () => {
    testAttachments(service, createAttachmentStatement);
  });

  describe('in the sub statement', () => {
    testAttachments(service, createAttachmentSubStatement);
  });
});
