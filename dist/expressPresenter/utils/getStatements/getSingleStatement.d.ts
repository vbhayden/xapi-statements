/// <reference types="express" />
import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
export interface Options {
    config: Config;
    res: Response;
    queryParams: any;
    id: string;
    voided: boolean;
    client: ClientModel;
    langs: string[];
}
declare const _default: (opts: Options) => Promise<void>;
export default _default;
