import { Request, Response } from 'express';
import getClient from '../utils/getClient';
import getStatements from '../utils/getStatements';
import Config from '../Config';
import storeStatements from './storeStatements';

interface Options {
  config: Config;
  method: string;
  req: Request;
  res: Response;
}

export default async ({ config, method, req, res }: Options) => {
  switch (method) {
    case 'POST': {
      const client = await getClient(config, req.body.Authorization || '');
      const unparsedBody = req.body.content;
      const body = JSON.parse(unparsedBody);
      const attachments: any[] = [];
      return storeStatements({ config, client, body, attachments, res });
    }
    case 'GET': {
      const headerParams = req.body;
      const queryParams = req.body;
      return getStatements({ config, res, headerParams, queryParams });
    }
    default: {
      throw new Error('Invalid method for alternate request syntax');
    }
  }
};
