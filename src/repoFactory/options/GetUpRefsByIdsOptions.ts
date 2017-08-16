import ClientModel from '../../models/ClientModel';

interface GetUpRefsByIdsOptions {
  targetIds: string[];
  client: ClientModel
}

export default GetUpRefsByIdsOptions;
