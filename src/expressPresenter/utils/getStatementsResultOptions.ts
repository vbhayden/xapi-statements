import { Request } from 'express';
import StatementsResultOptions from '../../service/options/StatementsResultOptions';
import getQueryParam from '../utils/getQueryParam';

export default (req: Request): StatementsResultOptions => {
  return {
    format: getQueryParam(req, 'format'),
    attachments: getQueryParam(req, 'attachments')
  };
};
