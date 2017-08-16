import Service from '../../serviceFactory/Service';
import createClientModel from './createClientModel';
import ClientModel from '../../models/ClientModel';
import storeAwaitedStatements from './storeAwaitedStatements';

export default (service: Service) => {
  return (statements: any[], attachments: any[] = [], client: ClientModel = createClientModel()): Promise<string[]> => {
    return storeAwaitedStatements(service)({
      models: statements,
      attachments,
      client
    });
  };
};
