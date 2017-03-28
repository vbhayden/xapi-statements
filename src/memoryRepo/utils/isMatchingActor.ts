import Actor from '../../models/Actor';

const isMatchingActor = (actor: Actor, filterActor: Actor): boolean => {
  if (filterActor.mbox !== undefined) {
    return filterActor.mbox === actor.mbox;
  } else if (filterActor.account !== undefined) {
    return (
      actor.account !== undefined &&
      filterActor.account.name === actor.account.name &&
      filterActor.account.homePage === actor.account.homePage
    );
  } else if (filterActor.openid !== undefined) {
    return filterActor.openid === actor.openid;
  } else if (filterActor.mbox_sha1sum !== undefined) {
    return filterActor.mbox_sha1sum === actor.mbox_sha1sum;
  } else if (
    actor.objectType === 'Group' &&
    filterActor.objectType === 'Group' &&
    filterActor.member !== undefined
  ) {
    const filterMember: Actor[] = filterActor.member;
    return (
      actor.member !== undefined &&
      actor.member.length === filterActor.member.length &&
      actor.member.filter((member, index) => {
        return !isMatchingActor(member, filterMember[index]);
      }).length === 0
    );
  }
  return false;
};

export default isMatchingActor;
