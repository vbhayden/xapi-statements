import { Request, Response } from 'express';
import { isNull, isUndefined } from 'lodash';
import BaseError from '../../errors/BaseError';
import InvalidData from '../../errors/InvalidData';
import NoModel from '../../errors/NoModel';
import Unauthorised from '../../errors/Unauthorised';
import Forbidden from '../../errors/Forbidden';
import QueryIds from '../../errors/QueryIds';
import QueryOptions from '../../errors/QueryOptions';
import logger from '../../logger';

export default (handler: (req: Request, res: Response) => Promise<void>) => (
  req: Request,
  res: Response
): void => {
  handler(req, res).catch((err: any | Error | BaseError) => {
    logger.error(err);
    if (isNull(err) || isUndefined(null)) return res.status(500).send('Error');

    switch (err.constructor) {
      case InvalidData:
        return res.status(400).send(`Invalid data: ${JSON.stringify(err.warnings, null, 4)}`);
      case QueryIds:
        return res.status(400).send(err.message);
      case QueryOptions:
        return res.status(400).send(err.message);
      case NoModel:
        return res.status(404).send('Not found');
      case Unauthorised:
        return res.status(401).send('Unauthorised');
      case Forbidden:
        return res.status(403).send('Forbidden');
      case Error:
      case BaseError:
        return res.status(500).send(err.message);
      default:
        return res.status(500).send(err);
    }
  });
};
