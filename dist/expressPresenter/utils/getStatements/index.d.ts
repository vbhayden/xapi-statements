/// <reference types="express" />
import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
export interface Options {
    config: Config;
    res: Response;
    client: ClientModel;
    queryParams: any;
    urlPath: string;
}
declare const _default: ({config, res, client, queryParams, urlPath}: Options) => Promise<void>;
export default _default;
