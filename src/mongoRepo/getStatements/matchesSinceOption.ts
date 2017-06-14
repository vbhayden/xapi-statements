import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (opts: GetStatementsOptions): Object => {
  return opts.since === undefined ? {} : {
    'statement.stored': { $gt: opts.since }
  };
};
