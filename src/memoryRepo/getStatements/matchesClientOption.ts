import StatementModel from '../../models/StatementModel';
import GetStatementsOptions from '../../repo/GetStatementsOptions';

export default (model: StatementModel, opts: GetStatementsOptions): boolean => {
  return (
    model.client === opts.client._id
  );
};
