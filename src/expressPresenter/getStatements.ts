import { Request, Response } from 'express';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import getStatements from './utils/getStatements';
import Config from './Config';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization') || '');
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
