import createStatement from '../utils/createStatement';
import agentTest from './utils/agentTest';

describe('get ids statements in actor agent', () => {
  agentTest((actor: any): any => {
    return createStatement({ actor });
  });
});
