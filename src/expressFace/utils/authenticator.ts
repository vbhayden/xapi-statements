import { Request } from 'express';
import fetch from 'node-fetch';
import Unauthorised from '../../errors/Unauthorised';

export type Authenticator = (req: Request) => Promise<{ organisation: string, scopes: string[] }>;

export default (llClientInfoEndpoint: string): Authenticator =>
  async (req) =>
    fetch(llClientInfoEndpoint, {
      headers: {
        Authorization: req.header('Authorization'),
      }
    }).then((res) =>
      res.json()
    ).then((json: any) => {
      const { organisation, scopes } = json;
      return { organisation, scopes };
    }).catch(() => {
      throw new Unauthorised();
    });
