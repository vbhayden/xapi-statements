import { Request, Response } from 'express';
import InvalidContentType from '../../errors/InvalidContentType';
import catchErrors from '../utils/catchErrors';
import getClient from '../utils/getClient';
import Config from '../Config';
import alternateRequest from './alternateRequest';
import storeStatements from './storeStatements';
import storeWithAttachments from './storeWithAttachments';
import validateVersionHeader from '../utils/validateHeaderVersion';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {

    const method = req.query.method;
    const contentType = req.header('Content-Type') || '';

    if (method === undefined && /multipart\/mixed/.test(contentType)) {
      return storeWithAttachments({ config, req, res });
    }

    if (method === undefined && contentType === 'application/json') {
      const client = await getClient(config, req.header('Authorization') || '');
      validateVersionHeader(req.header('X-Experience-API-Version'));

      const body = req.body;
      const attachments: any[] = [];
      return storeStatements({ config, client, body, attachments, res });
    }

    if (method !== undefined && contentType === 'application/x-www-form-urlencoded') {
      return alternateRequest({ config, method, req, res });
    }

    throw new InvalidContentType(contentType);
  });
};
