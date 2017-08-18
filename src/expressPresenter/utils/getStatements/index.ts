import { Response } from 'express';
import ClientModel from '../../../models/ClientModel';
import QueryIds from '../../../errors/QueryIds';
import Config from '../../Config';
import getSingleStatement from './getSingleStatement';
import getMultipleStatements from './getMultipleStatements';

export interface Options {
  config: Config;
  res: Response;
  client: ClientModel;
  queryParams: any;
  urlPath: string;
}

export default async ({ config, res, client, queryParams, urlPath }: Options) => {
  const statementId = queryParams.statementId;
  const voidedStatementId = queryParams.voidedStatementId;

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

  return getMultipleStatements({ config, res, queryParams, client, urlPath });
};
