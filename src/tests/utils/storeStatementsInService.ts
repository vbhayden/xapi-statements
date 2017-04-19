import { Service } from '../../service';

export default (service: Service) => {
  return (statements: any[]): Promise<string[]> => {
    return service.storeStatements({
      models: statements,
      attachments: []
    });
  };
};
