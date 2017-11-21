import { Request, Response } from 'express';
import * as streamToString from 'stream-to-string';
import InvalidContentType from '../errors/InvalidContentType';
import AttachmentModel from '../models/AttachmentModel';
import parseJson from '../utils/parseJson';
import catchErrors from './utils/catchErrors';
import { jsonContentTypePattern, multipartContentTypePattern } from './utils/contentTypePatterns';
import getClient from './utils/getClient';
import getMultipartStatements from './utils/getMultipartStatements';
import storeStatement from './utils/storeStatement';
import Config from './Config';
import validateVersionHeader from './utils/validateHeaderVersion';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const contentType = req.header('Content-Type') || '';
    const client = await getClient(config, req.header('Authorization') || '');
    validateVersionHeader(req.header('X-Experience-API-Version'));

    const queryParams = req.query;

    if (multipartContentTypePattern.test(contentType)) {
      const { body, attachments } = await getMultipartStatements(req);
      return storeStatement({ config, body, attachments, client, queryParams, res });
    }

    if (jsonContentTypePattern.test(contentType)) {
      const body = parseJson(await streamToString(req), ['body']);
      const attachments: AttachmentModel[] = [];
      return storeStatement({ config, body, attachments, client, queryParams, res });
    }

    throw new InvalidContentType(contentType);
  });
};
