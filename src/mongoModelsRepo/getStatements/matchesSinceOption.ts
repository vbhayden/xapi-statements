import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (opts: GetStatementsOptions): Object => {
  return opts.since === undefined ? {} : {
    stored: { $gt: new Date(opts.since) }
  };
};
