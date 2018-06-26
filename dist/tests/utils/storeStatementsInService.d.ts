import Service from '../../serviceFactory/Service';
import ClientModel from '../../models/ClientModel';
declare const _default: (service: Service) => (statements: any[], attachments?: any[], client?: ClientModel) => Promise<string[]>;
export default _default;
