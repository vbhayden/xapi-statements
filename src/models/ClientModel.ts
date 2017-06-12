import Actor from './Actor';

interface Credentials {
  basic_key: string;
  basic_secret: string;
}

interface ClientModel {
  _id?: string;
  title: string;
  organisation: string;
  lrs_id: string;
  api: Credentials;
  authority: Actor;
  isTrusted: boolean;
  scopes: string[];
}

export default ClientModel;
