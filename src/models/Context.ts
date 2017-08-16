import ContextActivities from './ContextActivities';
import Extensions from './Extensions';
import Group from './Group';
import Agent from './Agent';

interface Context {
  contextActivities?: ContextActivities;
  team?: Group;
  instructor?: Agent;
  registration?: string;
  extensions?: Extensions;
}

export default Context;
