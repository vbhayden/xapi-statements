import assertStatementsResult from '../utils/assertStatementsResult';
import { Service } from '../../service';
import setup from '../utils/setup';
import createClientModel from '../utils/createClientModel';
import attachmentsTest, { StatementCreator } from '../utils/attachmentsTest';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';

const TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_CLIENT = createClientModel();

describe('get statement with attachments', () => {
  const service = setup();

  const testAttachments = (service: Service, createStatement: StatementCreator) => {
    attachmentsTest(
      service,
      async (_expectedIds, expectedAttachments) => {
        const result = await service.getStatement({
          client: TEST_CLIENT,
          attachments: true,
          id: TEST_ID_1,
          voided: false
        });
        return assertStatementsResult(result, [TEST_ID_1], expectedAttachments);
      },
      createStatement
    );
  };

  describe('in the statement', () => {
    testAttachments(service, createAttachmentStatement);
  });

  describe('in the sub statement', () => {
    testAttachments(service, createAttachmentSubStatement);
  });
});
