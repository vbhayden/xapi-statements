import StoredStatementModel from '../models/StoredStatementModel';
export interface State {
    statements: StoredStatementModel[];
}
interface Config {
    state: State;
}
export default Config;
