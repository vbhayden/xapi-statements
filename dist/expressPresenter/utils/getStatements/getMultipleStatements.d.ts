/// <reference types="express" />
import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
export interface Options {
    config: Config;
    res: Response;
    queryParams: any;
    client: ClientModel;
    urlPath: string;
}
declare const _default: (opts: Options) => Promise<void>;
export default _default;
