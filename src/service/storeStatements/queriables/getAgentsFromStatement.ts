import { get, has, union } from 'lodash';
import StatementBase from '../../../models/StatementBase';
import Statement from '../../../models/Statement';
import Actor from '../../../models/Actor';
import Agent from '../../../models/Agent';
import Group from '../../../models/Group';
import StatementObject from '../../../models/StatementObject';
import { sha1 } from 'object-hash';

export const getActorIdents = (actor: Actor): string[] => {
  if (actor.mbox !== undefined) {
    return [actor.mbox];
  } else if (actor.account !== undefined) {
    return [`${actor.account.homePage}|${actor.account.name}`];
  } else if (actor.openid !== undefined) {
    return [actor.openid];
  } else if (actor.mbox_sha1sum !== undefined) {
    return [actor.mbox_sha1sum];
  }
  return [];
};

const getGroupMemberIdents = (group: Group): string[] => {
  if (group.member === undefined) {
    return [];
  }

  return union(...group.member.map(getAgentsFromObject));
};

export const getGroupIdents = (group: Group): string[] => {
  const idents = getActorIdents(group);
  const members = getGroupMemberIdents(group);
  return [...idents, ...members];
};

const getAgentsFromObject = (obj: StatementObject): string[] => {

  switch (obj.objectType) {
    case 'Agent':
      return getActorIdents(obj);
    case 'Group':
      return getGroupIdents(obj);
    default:
      return [];
  }
};

const getAgentsFromTeam = (statement: StatementBase): string[] => {
  const path = ['context', 'team'];
  if (has(statement, path)) {
    const team: Actor = get(statement, path);
    return getAgentsFromObject(team);
  }
  return [];
};

const getAgentsFromInstructor = (statement: StatementBase): string[] => {
  const path = ['context', 'instructor'];
  if (has(statement, path)) {
    const team: Actor = get(statement, path);
    return getAgentsFromObject(team);
  }
  return [];
};

const getRelatedAgentsFromStatementBase = (statement: StatementBase): string[] => {
  return [
    ...getAgentsFromStatement(statement),
    ...getAgentsFromTeam(statement),
    ...getAgentsFromInstructor(statement),
  ];
};

const getAgentsFromSubStatement = (statement: StatementBase): string[] => {
  if (statement.object.objectType === 'SubStatement') {
    return getRelatedAgentsFromStatementBase(statement.object);
  }

  return [];
};

export const getAgentsFromStatement = (statement: StatementBase): string[] => {
  return union([
    ...getAgentsFromObject(statement.actor),
    ...getAgentsFromObject(statement.object),
  ]);
};

export const getRelatedAgentsFromStatement = (statement: Statement): string[] => {
  return union([
    ...getRelatedAgentsFromStatementBase(statement),
    ...getAgentsFromObject(statement.authority),
    ...getAgentsFromSubStatement(statement),
  ]);
};
