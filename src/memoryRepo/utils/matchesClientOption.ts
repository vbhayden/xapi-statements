import ClientModel from '../../models/ClientModel';
import StatementModel from '../../models/StatementModel';

export default (model: StatementModel, client: ClientModel): boolean => {
  return (
    model.lrs_id === client.lrs_id
  );
};
