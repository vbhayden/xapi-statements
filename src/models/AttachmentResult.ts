import AttachmentModel from './AttachmentModel';
import Statement from './Statement';

interface AttachmentResult {
  attachments: AttachmentModel[];
  statements: Statement[];
}

export default AttachmentResult;
