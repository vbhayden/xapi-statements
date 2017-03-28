import { Request, Response } from 'express';

export default () => {
  return (req: Request, _res: Response, next: Function) => {
    if ((req.get('Content-Type') || '').indexOf('multipart/mixed') === 0) {
      req.body = '';
      req.on('data', (data: string) => {
        return req.body += data;
      });
      req.on('end', next);
    } else {
      next();
    }
  };
};
