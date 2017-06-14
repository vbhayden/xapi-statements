import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (opts: GetStatementsOptions): Object => {
  return opts.until === undefined ? {} : {
    'statement.stored': { $lte: opts.until }
  };
};
