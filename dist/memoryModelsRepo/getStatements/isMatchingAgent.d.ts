import Agent from '../../models/Agent';
import Group from '../../models/Group';
import FilterAgent from '../../models/FilterAgent';
declare const isMatchingActor: (actor: Agent | Group, filterAgent: FilterAgent) => boolean;
export default isMatchingActor;
