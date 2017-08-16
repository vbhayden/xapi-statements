import CommonService from 'jscommons/dist/serviceFactory/Service';
import StatementsResult from '../models/StatementsResult';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import GetStatementOptions from './options/GetStatementOptions';
import GetStatementsOptions from './options/GetStatementsOptions';
interface Service extends CommonService {
    storeStatements: (opts: StoreStatementsOptions) => Promise<string[]>;
    getStatement: (opts: GetStatementOptions) => Promise<StatementsResult>;
    getStatements: (opts: GetStatementsOptions) => Promise<StatementsResult>;
}
export default Service;
