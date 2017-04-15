import agentTest from './utils/agentTest';

describe('get statements by agent in instructor', () => {
  agentTest((instructor: any) => {
    return { context: { instructor } };
  }, true);
});
