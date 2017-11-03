import { get, has, union } from 'lodash';
import StatementBase from '../../../models/StatementBase';
import Statement from '../../../models/Statement';
import Actor from '../../../models/Actor';
import StatementObject from '../../../models/StatementObject';
import { sha1 } from 'object-hash';

const getActorIdent = (agent: Actor): string => {
  if (agent.mbox !== undefined) {
    return agent.mbox;
  } else if (agent.account !== undefined) {
    return `${agent.account.homePage}|${agent.account.name}`;
  } else if (agent.openid !== undefined) {
    return agent.openid;
  } else if (agent.mbox_sha1sum !== undefined) {
    return agent.mbox_sha1sum;
  }
  throw new Error('Unexpected actor identifier');
};

const getAgentFromObject = (obj: StatementObject): string[] => {
  if (obj.objectType === 'Agent') {
    return [getActorIdent(obj)];
  }

  return [];
};

export const getAgentsFromStatement = (statement: Statement): string[] => {
  return [
    ...getAgentFromObject(statement.actor),
    ...getAgentFromObject(statement.object),
  ];
};
