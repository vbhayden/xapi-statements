import agentFilterTest from './agentFilterTest';
import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
    describe('agent', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          ...actor,
          objectType: 'Agent',
        });
      }, relatedAgents);
    });
  };
};
