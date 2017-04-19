import createSubStatement from '../utils/createSubStatement';
import agentTest from './utils/agentTest';

describe('get statements by agent in sub statement instructor', () => {
  agentTest((instructor: any) => {
    return createSubStatement({ context: { instructor } });
  }, true);
});
