import StoredStatementModel from '../models/StoredStatementModel';

interface State {
  statements: StoredStatementModel[];
}

interface Config {
  state: State;
}

export default Config;
