import StatementBase from '../../../models/StatementBase';
import Statement from '../../../models/Statement';
import Agent from '../../../models/Agent';
import Group from '../../../models/Group';
export declare const getActorIdents: (actor: Agent | Group) => string[];
export declare const getGroupIdents: (group: Group) => string[];
export declare const getAgentsFromStatement: (statement: StatementBase) => string[];
export declare const getRelatedAgentsFromStatement: (statement: Statement) => string[];
