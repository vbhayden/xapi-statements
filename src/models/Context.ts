import ContextActivities from './ContextActivities';
import Group from './Group';
import Agent from './Agent';

interface Context {
  contextActivities: ContextActivities;
  team: Group;
  instructor: Agent;
  registration: string;
}

export default Context;
