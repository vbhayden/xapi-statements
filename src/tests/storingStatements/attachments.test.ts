import assertError from 'jscommons/dist/tests/utils/assertError';
import MissingAttachments from '../../errors/MissingAttachments';
import setup from '../utils/setup';
import createAttachment from '../utils/createAttachment';
import createAttachmentModel from '../utils/createAttachmentModel';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_CONTENT_A = 'A';
const TEST_CONTENT_B = 'B';
const TEST_ATTACHMENT_MODEL = createAttachmentModel(TEST_CONTENT_A);
const TEST_ATTACHMENT_A = createAttachment(TEST_CONTENT_A);
const TEST_ATTACHMENT_B = createAttachment(TEST_CONTENT_B);

describe('store statements with attachments', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should store the attachment when it is valid', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A]);
    await storeStatements([testStatement], [TEST_ATTACHMENT_MODEL]);
  });

  it('should throw an error when there is a missing SHA from the statements', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL]);
    await assertError(MissingAttachments, promise);
  });

  it('should throw an error when there is a missing SHA from a statement', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL]);
    await assertError(MissingAttachments, promise);
  });

  it('should throw an error when there is a missing SHA from the sub statements', async () => {
    const testStatement = createAttachmentSubStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL]);
    await assertError(MissingAttachments, promise);
  });

  it('should throw an error when there is a missing SHA from a sub statement', async () => {
    const testStatement = createAttachmentSubStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL]);
    await assertError(MissingAttachments, promise);
  });
});
