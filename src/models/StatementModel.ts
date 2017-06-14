import Statement from './Statement';

type Ref = { statement: Statement };

interface StatementModel {
  hasGeneratedId: boolean;
  organisation: string;
  client: string;
  lrs_id: string;
  person: string;
  active: boolean;
  voided: boolean;
  timestamp: string;
  stored: string;
  hash: string;
  refs: Ref[];
  statement: Statement;
}

export default StatementModel;
