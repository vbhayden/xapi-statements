import { Service } from '../../service';
import storeAwaitedStatements from './storeAwaitedStatements';

export default (service: Service) => {
  return (statements: any[], attachments: any[] = []): Promise<string[]> => {
    return storeAwaitedStatements(service)({
      models: statements,
      attachments,
      authority: {
        objectType: 'Agent',
        mbox: 'mailto:authority@example.com',
      },
    });
  };
};
