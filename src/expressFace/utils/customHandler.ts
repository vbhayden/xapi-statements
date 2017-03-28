import { Request, Response } from 'express';

export default (customRouteText: string) =>
  (_req: Request, res: Response): Promise<void> => {
    res.status(200).send(customRouteText);
    return Promise.resolve();
  };
