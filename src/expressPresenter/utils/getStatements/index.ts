import { Response } from 'express';
import QueryIds from '../../../errors/QueryIds';
import Config from '../../Config';
import getClient from '../getClient';
import getSingleStatement from './getSingleStatement';
import getMultipleStatements from './getMultipleStatements';

interface Options {
  config: Config;
  res: Response;
  headerParams: any;
  queryParams: any;
}

export default async ({ config, res, headerParams, queryParams }: Options) => {
  const statementId = queryParams.statementId;
  const voidedStatementId = queryParams.voidedStatementId;
  const client = await getClient(config, headerParams.Authorization || '');

  if (statementId !== undefined && voidedStatementId !== undefined) {
    throw new QueryIds();
  }

  if (statementId !== undefined && voidedStatementId === undefined) {
    const id = statementId;
    const voided = false;
    return getSingleStatement({ config, res, queryParams, id, voided, client });
  }

  if (statementId === undefined && voidedStatementId !== undefined) {
    const id = voidedStatementId;
    const voided = true;
    return getSingleStatement({ config, res, queryParams, id, voided, client });
  }

  return getMultipleStatements({ config, res, queryParams, client });
};
