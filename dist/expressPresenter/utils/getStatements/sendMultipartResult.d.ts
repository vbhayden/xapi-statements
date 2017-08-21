/// <reference types="express" />
import { Response } from 'express';
import AttachmentModel from '../../../models/AttachmentModel';
declare const _default: (jsonResponse: Object, attachments: AttachmentModel[], res: Response) => Promise<void>;
export default _default;
