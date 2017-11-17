import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import CommonHandler from 'jscommons/dist/expressPresenter/utils/Handler';
import BaseError from 'jscommons/dist/errors/BaseError';
import handleError from '../utils/handleError';
import Config from '../Config';

export default (config: Config, handler: CommonHandler) => {
  return (req: Request, res: Response): void => {
    handler(req, res).catch((err: any | Error | BaseError) => {
      const errorId = uuid();
      return handleError({ config, errorId, res, err });
    });
  };
};
