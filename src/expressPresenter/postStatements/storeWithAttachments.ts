import { Request, Response } from 'express';
import getClient from '../utils/getClient';
import getMultipartStatements from '../utils/getMultipartStatements';
import Config from '../Config';
import storeStatements from './storeStatements';

export interface Options {
  config: Config;
  req: Request;
  res: Response;
}

export default async ({ config, req, res }: Options) => {
  const client = await getClient(config, req.header('Authorization') || '');
  const { body, attachments } = await getMultipartStatements(req);
  return storeStatements({ config, client, body, attachments, res });
};
