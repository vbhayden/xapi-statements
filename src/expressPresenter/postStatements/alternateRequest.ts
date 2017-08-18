import { Request, Response } from 'express';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import getClient from '../utils/getClient';
import getStatements from '../utils/getStatements';
import storeStatement from '../utils/storeStatement';
import Config from '../Config';
import storeStatements from './storeStatements';
import validateVersionHeader from '../utils/validateHeaderVersion';

export interface Options {
  config: Config;
  method: string;
  req: Request;
  res: Response;
}

const checkContentType = (req: Request) => {
  if (req.body['Content-Type'] !== 'application/json') {
    throw new InvalidContentType(req.body['Content-Type']);
  }
};

const getBodyContent = (req: Request) => {
  const unparsedBody = req.body.content;
  const body = JSON.parse(unparsedBody);
  return body;
};

export default async ({ config, method, req, res }: Options) => {
  switch (method) {
    case 'POST': {
      checkContentType(req);
      const client = await getClient(config, req.body.Authorization || '');
      validateVersionHeader(req.header('X-Experience-API-Version'));
      const body = getBodyContent(req);
      return storeStatements({ config, client, body, attachments: [], res });
    }
    case 'GET': {
      const urlPath = req.path;
      const client = await getClient(config, req.body.Authorization || '');
      validateVersionHeader(req.header('X-Experience-API-Version'));
      const queryParams = req.body;
      return getStatements({ config, res, client, queryParams, urlPath });
    }
    case 'PUT': {
      checkContentType(req);
      const client = await getClient(config, req.body.Authorization || '');
      validateVersionHeader(req.header('X-Experience-API-Version'));
      const body = getBodyContent(req);
      const queryParams = req.body;
      return storeStatement({ config, client, body, attachments: [], queryParams, res });
    }
    default: {
      throw new InvalidMethod(method);
    }
  }
};
