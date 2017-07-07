import { includes } from 'lodash';
import ChangedStatementRef from '../errors/ChangedStatementRef';
import Statement from '../models/Statement';
import GetVoidersOptions from '../repoFactory/options/GetVoidersOptions';
import voidVerbId from '../utils/voidVerbId';
import getStatements from './utils/getStatements';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const query = (statement: Statement) => {
      return (
        statement.verb.id === voidVerbId &&
        statement.object.objectType === 'StatementRef' &&
        includes(opts.ids, statement.object.id)
      );
    };
    const project = (statement: Statement): string => {
      if (statement.object.objectType === 'StatementRef') {
        return statement.object.id;
      }

      /* istanbul ignore next */
      throw new ChangedStatementRef(statement.id);
    };
    return getStatements({ config, query, project });
  };
};
