import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';

export default (opts: GetStatementsOptions): Object => {
  return opts.until === undefined ? {} : {
    stored: { $lte: new Date(opts.until) }
  };
};
