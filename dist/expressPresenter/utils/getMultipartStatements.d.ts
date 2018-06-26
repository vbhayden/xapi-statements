import { Request } from 'express';
import AttachmentModel from '../../models/AttachmentModel';
declare const _default: (req: Request) => Promise<{
    body: any;
    attachments: AttachmentModel[];
}>;
export default _default;
