import { Request, Response } from 'express';
import InvalidContentType from '../errors/InvalidContentType';
import AttachmentModel from '../models/AttachmentModel';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import getMultipartStatements from './utils/getMultipartStatements';
import storeStatement from './utils/storeStatement';
import Config from './Config';

export default (config: Config) => {
  return catchErrors(async (req: Request, res: Response): Promise<void> => {
    const contentType = req.header('Content-Type') || '';
    const client = await getClient(config, req.header('Authorization') || '');
    const queryParams = req.query;

    if (/multipart\/mixed/.test(contentType)) {
      const { body, attachments } = await getMultipartStatements(req);
      return storeStatement({ config, body, attachments, client, queryParams, res });
    }

    if (contentType === 'application/json') {
      const body = req.body;
      const attachments: AttachmentModel[] = [];
      return storeStatement({ config, body, attachments, client, queryParams, res });
    }

    throw new InvalidContentType(contentType);
  });
};
