import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Attachment from '../../models/Attachment';
export declare type AttachmentsMap = {
    [hash: string]: Attachment;
};
declare const _default: (models: UnstoredStatementModel[]) => AttachmentsMap;
export default _default;
