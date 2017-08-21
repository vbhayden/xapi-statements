import { Response } from 'express';
import { reduce } from 'bluebird';
import AttachmentModel from '../../../models/AttachmentModel';

export default async (jsonResponse: Object, attachments: AttachmentModel[], res: Response) => {
  const boundary = 'abcABC0123\'()+_,-./:=?';
  const crlf = '\r\n';
  const fullBoundary = `${crlf}--${boundary}${crlf}`;
  res.setHeader('Content-Type', `multipart/mixed; charset=UTF-8; boundary="${boundary}"`);
  res.status(200);
  res.write(fullBoundary);
  res.write(`Content-Type:application/json${crlf}${crlf}`);
  res.write(JSON.stringify(jsonResponse));
  res.write(crlf);
  await reduce(attachments, (_result, attachment) => {
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
};
