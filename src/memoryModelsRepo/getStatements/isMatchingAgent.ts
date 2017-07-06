import { find } from 'lodash';
import Actor from '../../models/Actor';
import FilterAgent from '../../models/FilterAgent';

const isMatchingIfi = (actor: Actor, filterAgent: FilterAgent): boolean => {
  if (filterAgent.mbox !== undefined) {
    return filterAgent.mbox === actor.mbox;
  } else if (filterAgent.account !== undefined) {
    return (
      actor.account !== undefined &&
      filterAgent.account.name === actor.account.name &&
      filterAgent.account.homePage === actor.account.homePage
    );
  } else if (filterAgent.openid !== undefined) {
    return filterAgent.openid === actor.openid;
  } else if (filterAgent.mbox_sha1sum !== undefined) {
    return filterAgent.mbox_sha1sum === actor.mbox_sha1sum;
  }

  /* istanbul ignore next */
  return false;
};

const isMatchingMembers = (members: Actor[], filterAgent: FilterAgent) => {
  return find(members, (member) => {
    return isMatchingActor(member, filterAgent);
  }) !== undefined;
};

const isMatchingActor = (actor: Actor, filterAgent: FilterAgent): boolean => {
  return (
    isMatchingIfi(actor, filterAgent) ||
    (
      actor.objectType !== 'Group' || actor.member === undefined ? false : isMatchingMembers(actor.member, filterAgent)
    )
  );
};

export default isMatchingActor;
