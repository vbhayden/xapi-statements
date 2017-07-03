import { Request, Response } from 'express';
import { reduce } from 'bluebird';
import QueryIds from '../errors/QueryIds';
import checkStatementsOpts from './utils/checkStatementsOpts';
import getMoreLink from './utils/getMoreLink';
import catchErrors from './utils/catchErrors';
import getClient from './utils/getClient';
import getQueryParam from './utils/getQueryParam';
import getStatementsOptions from './utils/getStatementsOptions';
import getStatementsResultOptions from './utils/getStatementsResultOptions';
import Config from './Config';

export default (config: Config) => {
  return catchErrors(async (req: Request, res: Response): Promise<void> => {
    const timestamp = new Date().toISOString();
    const xapiVersion = '1.0.0';
    const statementId = getQueryParam(req, 'statementId');
    const voidedStatementId = getQueryParam(req, 'voidedStatementId');
    const resultOpts = getStatementsResultOptions(req);
    const statementsOpts = getStatementsOptions(req);
    const client = await getClient(config, req);

    if (statementId !== undefined && voidedStatementId !== undefined) {
      throw new QueryIds();
    }

    if (statementId !== undefined && voidedStatementId === undefined) {
      checkStatementsOpts(statementsOpts);
      const results = await config.service.getStatement({
        client,
        id: statementId,
        voided: false,
        ...resultOpts
      });
      res.setHeader('X-Experience-API-Consistent-Through', timestamp);
      res.setHeader('X-Experience-API-Version', xapiVersion);
      res.setHeader('Last-Modified', results.statements[0].stored);
      res.status(200);
      res.json(results.statements[0]);
      return;
    }

    if (statementId === undefined && voidedStatementId !== undefined) {
      checkStatementsOpts(statementsOpts);
      const results = await config.service.getStatement({
        client,
        id: voidedStatementId,
        voided: true,
        ...resultOpts
      });
      res.setHeader('X-Experience-API-Consistent-Through', timestamp);
      res.setHeader('X-Experience-API-Version', xapiVersion);
      res.setHeader('Last-Modified', results.statements[0].stored);
      res.status(200);
      res.json(results.statements[0]);
      return;
    }

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
      res.setHeader('X-Experience-API-Version', xapiVersion);
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
      .set('X-Experience-API-Version', xapiVersion)
      .status(200)
      .json(statementResult);
  });
};
