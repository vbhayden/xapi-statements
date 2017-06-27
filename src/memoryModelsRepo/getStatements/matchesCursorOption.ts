import StoredStatementModel from '../../models/StoredStatementModel';
import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (model: StoredStatementModel, opts: GetStatementsOptions): boolean => {
  if (opts.cursor === undefined) {
    return true;
  }

  return opts.ascending ? model._id > opts.cursor : model._id < opts.cursor;
};
