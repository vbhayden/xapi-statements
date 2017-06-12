import { Service } from '../../service';
import createClientModel from './createClientModel';
import storeAwaitedStatements from './storeAwaitedStatements';

export default (service: Service) => {
  return (statements: any[], attachments: any[] = []): Promise<string[]> => {
    return storeAwaitedStatements(service)({
      models: statements,
      attachments,
      client: createClientModel(),
    });
  };
};
