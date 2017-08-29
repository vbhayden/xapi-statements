import FullActivityModel from '../models/FullActivityModel';
import StoredStatementModel from '../models/StoredStatementModel';

export interface State {
  fullActivities: FullActivityModel[];
  statements: StoredStatementModel[];
}

interface Config {
  state: State;
}

export default Config;
