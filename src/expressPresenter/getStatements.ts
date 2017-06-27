import { Request, Response } from 'express';
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
      res
        .set('X-Experience-API-Consistent-Through', timestamp)
        .set('X-Experience-API-Version', xapiVersion)
        .status(200)
        .json(results.statements[0]);
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
      res
        .set('X-Experience-API-Consistent-Through', timestamp)
        .set('X-Experience-API-Version', xapiVersion)
        .status(200)
        .json(results.statements[0]);
      return;
    }

    const results = await config.service.getStatements({
      client,
      ...statementsOpts,
      ...resultOpts
    });
    const moreLink = getMoreLink({ results, resultOpts, statementsOpts });
    res
      .set('X-Experience-API-Consistent-Through', timestamp)
      .set('X-Experience-API-Version', xapiVersion)
      .status(200)
      .json({
        more: moreLink,
        statements: results.statements,
      });
  });
};
