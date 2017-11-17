import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import CommonHandler from 'jscommons/dist/expressPresenter/utils/Handler';
import BaseError from 'jscommons/dist/errors/BaseError';
import handleError from '../utils/handleError';
import Config from '../Config';

export default (config: Config, handler: CommonHandler) => {
  return (req: Request, res: Response): void => {
    handler(req, res).catch(async (err: any | Error | BaseError) => {
      const tracker = await config.tracker;
      const errorId = uuid();
      tracker('errorId', errorId);
      config.logger.silly(`${errorId}: xapi-statements request`, {
        body: req.body,
        headers: req.headers,
        query: req.query,
        method: req.method,
        url: req.url,
      });
      return handleError({ config, errorId, res, err });
    });
  };
};
