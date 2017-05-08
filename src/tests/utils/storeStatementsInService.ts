import { Service } from '../../service';

export default (service: Service) => {
  return (statements: any[], attachments: any[] = []): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments,
      authority: {
        objectType: 'Agent',
        mbox: 'mailto:authority@example.com',
      },
    });
  };
};
