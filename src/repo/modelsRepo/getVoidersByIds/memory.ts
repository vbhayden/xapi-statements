import { includes } from 'lodash';
import Statement from '../../../models/Statement';
import voidVerbId from '../../../utils/voidVerbId';
import getStatements from '../utils/memoryModels/getStatements';
import Config from '../utils/memoryModels/Config';
import Signature, { Opts } from './Signature';

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    const query = (statement: Statement) => {
      return (
        statement.verb.id === voidVerbId &&
        statement.object.objectType === 'StatementRef' &&
        includes(ids, statement.id)
      );
    };
    const project = (statement: Statement): string => {
      return statement.id;
    };
    return getStatements({ config, query, project, client });
  };
};
