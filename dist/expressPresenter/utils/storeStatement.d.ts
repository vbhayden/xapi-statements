import { Response } from 'express';
import AttachmentModel from '../../models/AttachmentModel';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Options {
    config: Config;
    body: any;
    attachments: AttachmentModel[];
    client: ClientModel;
    queryParams: any;
    res: Response;
}
declare const _default: ({ config, body, attachments, client, queryParams, res }: Options) => Promise<void>;
export default _default;
