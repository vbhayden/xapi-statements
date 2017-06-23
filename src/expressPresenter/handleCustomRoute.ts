import { Request, Response } from 'express';
import catchErrors from './utils/catchErrors';
import Config from './Config';

export default (config: Config) => {
  return catchErrors(async (_req: Request, res: Response): Promise<void> => {
    res.status(200).send(config.customRouteText);
  });
};
