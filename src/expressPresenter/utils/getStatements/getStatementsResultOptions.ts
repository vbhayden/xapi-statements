import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';
import ClientModel from '../../../models/ClientModel';
import * as boolean from 'boolean';

export default (queryParams: any, client: ClientModel): StatementsResultOptions => {
  return {
    format: queryParams.format,
    attachments:
    queryParams.attachments !== undefined ? boolean(queryParams.attachments) : undefined,
    client
  };
};
