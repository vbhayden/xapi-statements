import GetClientSignature from './getClient/Signature';

interface Repo {
  readonly getClient: GetClientSignature;
}

export default Repo;
