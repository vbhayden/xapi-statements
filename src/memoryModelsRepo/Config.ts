import StatementModel from '../models/StatementModel';

interface State {
  statements: StatementModel[];
}

interface Config {
  state: State;
}

export default Config;
