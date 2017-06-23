import AttachmentModel from './AttachmentModel';
import IdFormattedStatement from './IdFormattedStatement';
import Statement from './Statement';

interface StatementsResult {
  attachments: AttachmentModel[];
  statements: (Statement | IdFormattedStatement)[];
}

export default StatementsResult;
