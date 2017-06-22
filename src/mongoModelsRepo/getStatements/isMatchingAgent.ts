import FilterAgent from '../../models/FilterAgent';

const isMatchingIfi = (actorKey: string, filterAgent: FilterAgent): Object => {
  if (filterAgent.mbox !== undefined) {
    return { [`${actorKey}.mbox`]: filterAgent.mbox };
  }

  if (filterAgent.account !== undefined) {
    return {
      [`${actorKey}.account.name`]: filterAgent.account.name,
      [`${actorKey}.account.homePage`]: filterAgent.account.homePage,
    };
  }

  if (filterAgent.openid !== undefined) {
    return { [`${actorKey}.openid`]: filterAgent.openid };
  }

  if (filterAgent.mbox_sha1sum !== undefined) {
    return { [`${actorKey}.mbox_sha1sum`]: filterAgent.mbox_sha1sum };
  }
  return {};
};

const isMatchingActor = (actorKey: string, filterAgent: FilterAgent): Object => {
  return {
    $or: [
      isMatchingIfi(actorKey, filterAgent),
      isMatchingIfi(`${actorKey}.member`, filterAgent)
    ]
  };
};

export default isMatchingActor;
