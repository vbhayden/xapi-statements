import { Request, Response } from 'express';
import Config from '../Config';
export interface Options {
    config: Config;
    method: string;
    req: Request;
    res: Response;
}
declare const _default: ({ config, method, req, res }: Options) => Promise<void>;
export default _default;
