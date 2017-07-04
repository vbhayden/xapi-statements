import { Request, Response } from 'express';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import getClient from '../utils/getClient';
import getStatements from '../utils/getStatements';
import storeStatement from '../utils/storeStatement';
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
      if (req.body['Content-Type'] !== 'application/json') {
        throw new InvalidContentType(req.body['Content-Type']);
      }

      const client = await getClient(config, req.body.Authorization || '');
      const unparsedBody = req.body.content;
      const body = JSON.parse(unparsedBody);
      const attachments: any[] = [];
      return storeStatements({ config, client, body, attachments, res });
    }
    case 'GET': {
      const client = await getClient(config, req.body.Authorization || '');
      const queryParams = req.body;
      return getStatements({ config, res, client, queryParams });
    }
    case 'PUT': {
      if (req.body['Content-Type'] !== 'application/json') {
        throw new InvalidContentType(req.body['Content-Type']);
      }

      const client = await getClient(config, req.body.Authorization || '');
      const unparsedBody = req.body.content;
      const body = JSON.parse(unparsedBody);
      const attachments: any[] = [];
      const queryParams = req.body;
      return storeStatement({ config, client, body, attachments, queryParams, res });
    }
    default: {
      throw new InvalidMethod(method);
    }
  }
};
