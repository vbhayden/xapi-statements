import { Request, Response } from 'express';
import ClientModel from '../models/ClientModel';
import { ALL } from '../utils/scopes';

export default async (_req: Request, res: Response): Promise<void> => {
  const client: ClientModel = {
    title: 'dummy_title',
    organisation: 'dummy_organisation',
    lrs_id: 'dummy_lrs_id',
    api: {
      basic_key: 'dummy_basic_key',
      basic_secret: 'dummy_basic_secret',
    },
    authority: {
      objectType: 'Agent',
      mbox: 'mailto:dummy@example.com',
    },
    isTrusted: true,
    scopes: [ALL],
  };
  res.status(200).json(client);
};
