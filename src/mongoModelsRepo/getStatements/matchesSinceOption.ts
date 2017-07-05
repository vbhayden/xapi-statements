import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';

export default (opts: GetStatementsOptions): Object => {
  return opts.since === undefined ? {} : {
    stored: { $gt: new Date(opts.since) }
  };
};
