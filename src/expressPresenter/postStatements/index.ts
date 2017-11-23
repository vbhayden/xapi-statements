import { Request, Response } from 'express';
import * as streamToString from 'stream-to-string';
import InvalidContentType from '../../errors/InvalidContentType';
import parseJson from '../../utils/parseJson';
import catchErrors from '../utils/catchErrors';
import {
  alternateContentTypePattern,
  jsonContentTypePattern,
  multipartContentTypePattern,
} from '../utils/contentTypePatterns';
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

    if (method === undefined && multipartContentTypePattern.test(contentType)) {
      return storeWithAttachments({ config, req, res });
    }

    if (method === undefined && jsonContentTypePattern.test(contentType)) {
      const client = await getClient(config, req.header('Authorization') || '');
      validateVersionHeader(req.header('X-Experience-API-Version'));

      const body = parseJson(await streamToString(req), ['body']);
      const attachments: any[] = [];
      return storeStatements({ config, client, body, attachments, res });
    }

    if (method !== undefined || alternateContentTypePattern.test(contentType)) {
      return alternateRequest({ config, method, req, res });
    }

    throw new InvalidContentType(contentType);
  });
};
