import { Request, Response } from 'express';
import { get } from 'lodash';
import * as streamToString from 'stream-to-string';
import InvalidBoundary from '../../errors/InvalidBoundary';
import getClient from '../utils/getClient';
import getParts from '../utils/getParts';
import Config from '../Config';
import storeStatements from './storeStatements';

const BOUNDARY_REGEXP = /boundary\=\"([A-Za-z\d\'\(\)\+\_\,\-\.\/\:\=\?]+)\"/;

const getBoundaryFromContentType = (contentType: string): string => {
  const result = BOUNDARY_REGEXP.exec(contentType);
  if (result === null || result.length < 1 || result.length > 2) {
    throw new InvalidBoundary(contentType);
  }
  return result[1];
};

interface Options {
  config: Config;
  req: Request;
  res: Response;
}

export default async ({ config, req, res }: Options) => {
  const contentType = req.header('Content-Type') || '';
  const client = await getClient(config, req.header('Authorization') || '');
  const boundary = getBoundaryFromContentType(contentType);
  const parts = await getParts(req, boundary);
  const hasStatements = (
    parts.length >= 1 &&
    get(parts[0].headers, 'content-type') === 'application/json'
  );

  if (!hasStatements) {
    throw new Error('Does not have statements');
  }

  const unparsedBody = await streamToString(parts[0].stream);
  const body = JSON.parse(unparsedBody);
  const attachments = parts.slice(1).map((part) => {
    return {
      stream: part.stream,
      hash: get(part.headers, 'x-experience-api-hash'),
      contentType: get(part.headers, 'content-type'),
    };
  });
  return storeStatements({ config, client, body, attachments, res });
};
