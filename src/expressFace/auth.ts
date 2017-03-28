import { Request, Response } from 'express';
import { ALL } from '../utils/scopes';

export default (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    organisation: 'Demo',
    scopes: [ALL],
  });
  return Promise.resolve();
};
