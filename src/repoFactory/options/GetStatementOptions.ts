import ClientModel from '../../models/ClientModel';

interface GetStatementOptions {
  id: string;
  voided?: boolean;
  client: ClientModel;
}

export default GetStatementOptions;
