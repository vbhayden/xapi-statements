/* tslint:disable-next-line:no-unused-variable */
import IdFormattedStatement from '../../models/IdFormattedStatement';
import Statement from '../../models/Statement'; /* tslint:disable-line:no-unused-variable */
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import formatCanonically from './canonicalFormat/statement';
import formatIds from './idsFormat/statement';

export default (models: UnstoredStatementModel[], format: string, langs: string[]) => {
  switch (format) {
    case 'ids':
      return models.map(model => {
        return formatIds(model.statement);
      });
    case 'canonical':
      return models.map(model => {
        return formatCanonically(model.statement, langs);
      });
    case 'exact':
    default:
      return models.map(model => {
        return model.statement;
      });
  }
};
