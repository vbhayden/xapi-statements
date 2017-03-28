import Statement from './Statement';

interface StatementModel {
  _id?: string;
  organisation: string;
  lrs_id: string;
  person: string;
  active: boolean;
  voided: boolean;
  timestamp: string;
  stored: string;
  refs: any;
  statement: Statement;
}

export default StatementModel;
