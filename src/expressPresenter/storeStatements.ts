import { Request, Response } from 'express';
import { isArray, get } from 'lodash';
import * as streamToString from 'stream-to-string';
import InvalidBoundary from '../errors/InvalidBoundary';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import getQueryParam from './utils/getQueryParam';
import getParts from './utils/getParts';
import Config from './Config';
const xapiVersion = '1.0.0';

const boundaryRegexp = /boundary\=\"([A-Za-z\d\'\(\)\+\_\,\-\.\/\:\=\?]+)\"/;
const getBoundaryFromContentType = (contentType: string): string => {
  const result = boundaryRegexp.exec(contentType);
  if (result === null || result.length < 1 || result.length > 2) {
    throw new InvalidBoundary(contentType);
  }
  return result[1];
};

export default (config: Config) => {
  const storeStatements = async (req: Request, body: any, attachments: any[], res: Response) => {
    const client = await getClient(config, req);
    const models = isArray(body) ? body : [body];
    const ids = await config.service.storeStatements({ models, attachments, client });
    res.setHeader('X-Experience-API-Version', xapiVersion);
    res.status(200);
    res.json(ids);
  };

  return catchErrors(async (req: Request, res: Response): Promise<void> => {
    const method = getQueryParam(req, 'method');
    const contentType = req.header('Content-Type') || '';

    if (method === undefined) {
      if (contentType === 'application/json') {
        const body = req.body;
        await storeStatements(req, body, [], res);
        return;
      }
      if (/multipart\/mixed/.test(contentType)) {
        const boundary = getBoundaryFromContentType(contentType);
        const parts = await getParts(req, boundary);
        const hasStatements = (
          parts.length >= 1 &&
          get(parts[0].headers, 'content-type') === 'application/json'
        );

        if (!hasStatements) {
          throw new Error('Does not have statements');
        }

        const body = await streamToString(parts[0].stream);
        const parsedBody = JSON.parse(body);
        const attachments = parts.slice(1).map((part) => {
          return {
            stream: part.stream,
            hash: get(part.headers, 'x-experience-api-hash'),
            contentType: get(part.headers, 'content-type'),
          };
        });
        await storeStatements(req, parsedBody, attachments, res);
        return;
      }
    }
    throw new Error('Invalid content type');
  });
};
