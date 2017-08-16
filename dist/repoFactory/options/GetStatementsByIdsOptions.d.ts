import ClientModel from '../../models/ClientModel';
interface GetStatementsByIdsOptions {
    ids: string[];
    client: ClientModel;
}
export default GetStatementsByIdsOptions;
