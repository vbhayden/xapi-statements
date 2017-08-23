import agentTest from './agentTest';
import groupTest from './groupTest';
import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, related_agents: boolean = false) => {
    agentTest(assertFilteredStatements)(createActor, related_agents);
    groupTest(assertFilteredStatements)(createActor, related_agents);
  };
};
