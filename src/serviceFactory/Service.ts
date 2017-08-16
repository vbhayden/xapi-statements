import CommonService from 'jscommons/dist/serviceFactory/Service';
import GetClientOptions from './options/GetClientOptions';
import GetClientResult from './results/GetClientResult';
import StatementsResult from '../models/StatementsResult';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetStatementsOptions from './options/GetStatementsOptions';


interface Service extends CommonService {
  // Statement functions.
  readonly getClient: (opts: GetClientOptions) => Promise<GetClientResult>;
  storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
  getStatement: (opts: GetStatementOptions) => Promise<StatementsResult>;
  getStatements: (opts: GetStatementsOptions) => Promise<StatementsResult>;
}

export default Service;
