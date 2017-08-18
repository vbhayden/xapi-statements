import { Request } from 'express';
import { get } from 'lodash';
import * as streamToString from 'stream-to-string';
import AttachmentModel from '../../models/AttachmentModel';
import InvalidBoundary from '../../errors/InvalidBoundary';
import NoStatements from '../../errors/NoStatements';
import getParts from '../utils/getParts';

const BOUNDARY_REGEXP = /boundary\=((?:\"(?:[A-Za-z\d\'\(\)\+\_\,\-\.\/\:\=\?]+)\")|(?:[A-Za-z\d\-]+))/;

const getBoundaryFromContentType = (contentType: string): string => {
  const result = BOUNDARY_REGEXP.exec(contentType);
  if (result === null || result.length < 1 || result.length > 2) {
    throw new InvalidBoundary(contentType);
  }
  return result[1].replace(/\"/g, '');
};

export default async (req: Request) => {
  const contentType = req.header('Content-Type') || '';
  const boundary = getBoundaryFromContentType(contentType);
  const parts = await getParts(req, boundary);
  const hasStatements = (
    parts.length >= 1 &&
    get(parts[0].headers, 'content-type') === 'application/json'
  );

  if (!hasStatements) {
    throw new NoStatements();
  }

  const unparsedBody = await streamToString(parts[0].stream);
  const body = JSON.parse(unparsedBody);
  const attachments = parts.slice(1).map((part): AttachmentModel => {
    return {
      stream: part.stream,
      hash: get(part.headers, 'x-experience-api-hash') as string,
      contentType: get(part.headers, 'content-type') as string,
    };
  });

  return { body, attachments };
};
