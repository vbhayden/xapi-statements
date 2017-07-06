import { Service as CommonService} from 'jscommons/dist/service';
import StatementsResult from '../models/StatementsResult';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetStatementsOptions from './options/GetStatementsOptions';

interface Service extends CommonService {
  // Statement functions.
  storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
  getStatement: (opts: GetStatementOptions) => Promise<StatementsResult>;
  getStatements: (opts: GetStatementsOptions) => Promise<StatementsResult>;
}

export default Service;
