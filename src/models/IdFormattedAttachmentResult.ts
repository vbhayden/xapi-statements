import AttachmentModel from './AttachmentModel';
import IdFormattedStatement from './IdFormattedStatement';

interface AttachmentResult {
  attachments: AttachmentModel;
  statements: IdFormattedStatement[];
}

export default AttachmentResult;
