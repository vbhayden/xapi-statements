import AttachmentModel from './AttachmentModel';
import IdFormattedStatement from './IdFormattedStatement';
import Statement from './Statement';

interface AttachmentResult {
  attachments: AttachmentModel[];
  statements: (Statement | IdFormattedStatement)[];
}

export default AttachmentResult;
