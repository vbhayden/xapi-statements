import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import { jsonContentTypePattern } from '../utils/contentTypePatterns';
import getClient from '../utils/getClient';
import getStatements from '../utils/getStatements';
import storeStatement from '../utils/storeStatement';
import Config from '../Config';
import storeStatements from './storeStatements';
import validateVersionHeader from '../utils/validateHeaderVersion';
import getUrlPath from '../utils/getUrlPath';
import checkUnknownParams from '../utils/checkUnknownParams';
import parseJson from '../../utils/parseJson';

export interface Options {
  config: Config;
  method: string;
  req: Request;
  res: Response;
}

const checkContentType = (req: Request) => {
  const contentType = req.body['Content-Type'] || 'application/json';
  if (!jsonContentTypePattern.test(contentType)) {
    throw new InvalidContentType(req.body['Content-Type']);
  }
};

const getBodyContent = (req: Request) => {
  const unparsedBody = req.body.content;
  const body = parseJson(unparsedBody, ['body', 'content']);
  return body;
};

const getHeader = (req: Request, name: string): string => {
  return req.body[name] || req.header(name) || '';
};

export default async ({ config, method, req, res }: Options) => {
  checkUnknownParams(req.query, ['method']);

  switch (method) {
    case 'POST': {
      checkContentType(req);
      const client = await getClient(config, getHeader(req, 'Authorization'));
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
      const body = getBodyContent(req);
      return storeStatements({ config, client, body, attachments: [], res });
    }
    case 'GET': {
      const urlPath = getUrlPath(req);
      const client = await getClient(config, getHeader(req, 'Authorization'));
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
      const acceptedLangs = defaultTo<string>(req.header('Accept-Language'), '');
      const queryParams = req.body;
      return getStatements({ config, res, client, queryParams, urlPath, acceptedLangs });
    }
    case 'PUT': {
      checkContentType(req);
      const client = await getClient(config, getHeader(req, 'Authorization'));
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
      const body = getBodyContent(req);
      const queryParams = req.body;
      return storeStatement({ config, client, body, attachments: [], queryParams, res });
    }
    default: {
      throw new InvalidMethod(method);
    }
  }
};
