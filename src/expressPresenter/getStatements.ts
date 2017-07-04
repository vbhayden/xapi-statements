import { Request, Response } from 'express';
import catchErrors from './utils/catchErrors';
import getStatements from './utils/getStatements';
import Config from './Config';

export default (config: Config) => {
  return catchErrors(async (req: Request, res: Response): Promise<void> => {
    const headerParams = req.headers;
    const queryParams = req.query;

    return getStatements({
      config,
      res,
      headerParams,
      queryParams,
    });
  });
};
