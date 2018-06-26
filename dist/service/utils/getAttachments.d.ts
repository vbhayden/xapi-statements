import AttachmentModel from '../../models/AttachmentModel';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import Config from '../Config';
declare const _default: (config: Config, models: UnstoredStatementModel[], hasAttachments: boolean, lrsId: string) => Promise<AttachmentModel[]>;
export default _default;
