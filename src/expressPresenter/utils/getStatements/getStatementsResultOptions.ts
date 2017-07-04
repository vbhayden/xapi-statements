import StatementsResultOptions from '../../../service/options/StatementsResultOptions';

export default (queryParams: any): StatementsResultOptions => {
  return {
    format: queryParams.format,
    attachments: queryParams.attachments
  };
};
