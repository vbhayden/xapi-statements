import fetch from 'node-fetch';
import ClientModel from '../../models/ClientModel';
import Actor from '../../models/Actor';
import Unauthorised from '../../errors/Unauthorised';
import Config from '../Config';

export default async (config: Config, authHeader: string): Promise<ClientModel> => {
  try {
    const json = await fetch(config.llClientInfoEndpoint, {
      headers: {
        Authorization: authHeader
      }
    }).then(res => {
      return res.json();
    });

    return {
      _id: json._id as string,
      title: json.title as string,
      organisation: json.organisation as string,
      lrs_id: json.lrs_id as string,
      authority: json.authority as Actor,
      isTrusted: json.isTrusted as boolean,
      scopes: json.scopes as string[]
    };
  } catch (err) {
    throw new Unauthorised();
  }
};
