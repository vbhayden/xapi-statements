import { Request } from 'express';

export default (req: Request, paramName: string): any => {
  return req.query[paramName];
};
