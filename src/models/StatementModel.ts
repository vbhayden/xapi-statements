import Statement from './Statement';

interface StatementModel {
  _id?: string;
  hasGeneratedId: boolean;
  organisation: string;
  lrs_id: string;
  person: string;
  active: boolean;
  voided: boolean;
  timestamp: string;
  stored: string;
  hash: string;
  refs: Statement[];
  statement: Statement;
}

export default StatementModel;
