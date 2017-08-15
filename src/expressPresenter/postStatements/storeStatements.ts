import { Response } from 'express';
import { isArray } from 'lodash';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
import xapiVersion from '../../utils/xapiVersion';

export interface Options {
  config: Config;
  client: ClientModel;
  body: any;
  attachments: any[];
  res: Response;
}

export default async ({ config, client, body, attachments, res }: Options) => {
  const models = isArray(body) ? body : [body];
  const ids = await config.service.storeStatements({ models, attachments, client });
  res.setHeader('X-Experience-API-Version', xapiVersion);
  res.status(200);
  res.json(ids);
};
