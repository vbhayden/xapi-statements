import { Request, Response } from 'express';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import getStatements from './utils/getStatements';
import Config from './Config';
import validateVersionHeader from './utils/validateHeaderVersion';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization') || '');

    validateVersionHeader(req.header('X-Experience-API-Version'));

    const queryParams = req.query;
    const urlPath = req.path;

    return getStatements({
      config,
      res,
      client,
      queryParams,
      urlPath
    });
  });
};
