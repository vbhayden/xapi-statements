import { Request, Response } from 'express';
import ClientModel from '../models/ClientModel';
import { ALL } from '../utils/scopes';
import catchErrors from './utils/catchErrors';
import Config from './Config';

export default (config: Config) => {
  return catchErrors(config, async (_req: Request, res: Response): Promise<void> => {
    const client: ClientModel = {
      _id: 'dummy_id',
      title: 'dummy_title',
      organisation: 'dummy_organisation',
      lrs_id: 'dummy_lrs_id',
      authority: {
        objectType: 'Agent',
        mbox: 'mailto:dummy@example.com'
      },
      isTrusted: true,
      scopes: [ALL]
    };
    res.status(200).json(client);
  });
};
