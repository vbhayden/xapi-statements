import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';

export default (opts: GetStatementsOptions): object => {
  if (opts.cursor === undefined) {
    return {};
  }

  return {
    _id: (
      opts.ascending
        ? { $gt: opts.cursor }
        : { $lt: opts.cursor }
    ),
  };
};
