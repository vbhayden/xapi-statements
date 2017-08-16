/// <reference types="express" />
import { Request, Response } from 'express';
import Config from '../Config';
export interface Options {
    config: Config;
    req: Request;
    res: Response;
}
declare const _default: ({config, req, res}: Options) => Promise<void>;
export default _default;
