/// <reference types="express" />
import { Response } from 'express';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Options {
    config: Config;
    client: ClientModel;
    body: any;
    attachments: any[];
    res: Response;
}
declare const _default: ({config, client, body, attachments, res}: Options) => Promise<void>;
export default _default;
