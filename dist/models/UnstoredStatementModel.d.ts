import Statement from './Statement';
export declare type Ref = {
    statement: Statement;
};
interface UnstoredStatementModel {
    hasGeneratedId: boolean;
    organisation: string;
    client: string;
    lrs_id: string;
    person: string | null;
    active: boolean;
    voided: boolean;
    timestamp: Date;
    stored: Date;
    hash: string;
    refs: Ref[];
    statement: Statement;
}
export default UnstoredStatementModel;
