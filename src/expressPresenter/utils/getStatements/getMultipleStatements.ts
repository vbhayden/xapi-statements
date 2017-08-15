import { Response } from 'express';
import { reduce } from 'bluebird';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
import getMoreLink from './getMoreLink';
import getStatementsOptions from './getStatementsOptions';
import getStatementsResultOptions from './getStatementsResultOptions';
import { xapiHeaderVersion } from '../../../utils/constants';

export interface Options {
  config: Config;
  res: Response;
  queryParams: any;
  client: ClientModel;
}

export default async (opts: Options) => {
  const { queryParams, config, res, client } = opts;
  const timestamp = new Date().toISOString();
  const resultOpts = getStatementsResultOptions(queryParams);
  const statementsOpts = getStatementsOptions(queryParams);

  const results = await config.service.getStatements({
    client,
    ...statementsOpts,
    ...resultOpts
  });
  const moreLink = getMoreLink({ results, resultOpts, statementsOpts });
  const statementResult = {
    more: moreLink,
    statements: results.statements,
  };
  if (resultOpts.attachments) {
    const boundary = 'abcABC0123\'()+_,-./:=?';
    const crlf = '\r\n';
    const fullBoundary = `${crlf}--${boundary}${crlf}`;
    res.setHeader('X-Experience-API-Consistent-Through', timestamp);
    res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
    res.setHeader('Content-Type', `multipart/mixed; charset=UTF-8; boundary="${boundary}"`);
    res.status(200);
    res.write(fullBoundary);
    res.write(`Content-Type:application/json${crlf}${crlf}`);
    res.write(JSON.stringify(statementResult));
    res.write(crlf);
    await reduce(results.attachments, (_result, attachment) => {
      return new Promise((resolve, reject) => {
        res.write(fullBoundary);
        res.write(`Content-Type:${attachment.contentType}${crlf}`);
        res.write(`Content-Transfer-Encoding:binary${crlf}`);
        res.write(`X-Experience-API-Hash:${attachment.hash}${crlf}`);
        res.write(crlf);
        attachment.stream.on('data', (data: any) => {
          res.write(data);
        });
        attachment.stream.on('end', () => {
          res.write(crlf);
          resolve();
        });
        attachment.stream.on('error', (err: any) => {
          reject(err);
        });
      });
    }, Promise.resolve());
    res.write(`--${boundary}--`);
    res.end();
    return;
  }
  res
    .set('X-Experience-API-Consistent-Through', timestamp)
    .set('X-Experience-API-Version', xapiHeaderVersion)
    .status(200)
    .json(statementResult);
};
