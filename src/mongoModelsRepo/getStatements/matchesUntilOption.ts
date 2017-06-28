import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (opts: GetStatementsOptions): Object => {
  return opts.until === undefined ? {} : {
    stored: { $lte: new Date(opts.until) }
  };
};
