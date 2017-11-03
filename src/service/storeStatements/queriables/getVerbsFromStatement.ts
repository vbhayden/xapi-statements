import { get, has } from 'lodash';

export default (statement: any): string[] => {
  if (!has(statement, ['verb', 'id'])) {
    return [];
  }
  const verb = get(statement, ['verb', 'id'], undefined);
  return [verb];
};
