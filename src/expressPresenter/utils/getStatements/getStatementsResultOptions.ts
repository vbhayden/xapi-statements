import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';

export default (queryParams: any): StatementsResultOptions => {
  return {
    format: queryParams.format,
    attachments: queryParams.attachments
  };
};
