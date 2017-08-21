import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';
import getMoreLink from './getMoreLink';
import getStatementsOptions from './getStatementsOptions';
import getStatementsResultOptions from './getStatementsResultOptions';
import { xapiHeaderVersion } from '../../../utils/constants';
import sendMultipartResult from './sendMultipartResult';

export interface Options {
  config: Config;
  res: Response;
  queryParams: any;
  client: ClientModel;
  urlPath: string;
}

export default async (opts: Options) => {
  const { queryParams, config, res, client, urlPath } = opts;
  const timestamp = new Date().toISOString();
  const resultOpts = getStatementsResultOptions(queryParams);
  const statementsOpts = getStatementsOptions(queryParams);

  const results = await config.service.getStatements({
    client,
    ...statementsOpts,
    ...resultOpts
  });
  const moreLink = getMoreLink({ results, resultOpts, statementsOpts, urlPath });
  const jsonResponse = {
    more: moreLink,
    statements: results.statements,
  };
  res.setHeader('X-Experience-API-Consistent-Through', timestamp);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);

  if (resultOpts.attachments) {
    return sendMultipartResult(jsonResponse, results.attachments, res);
  }

  res.status(200).json(jsonResponse);
};
