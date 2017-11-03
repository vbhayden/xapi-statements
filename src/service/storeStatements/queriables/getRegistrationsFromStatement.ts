import { get, has } from 'lodash';

export default (statement: any): string[] => {
  if (!has(statement, ['context', 'registration'])) {
    return [];
  }
  const registration = get(statement, ['context', 'registration'], undefined);
  return [registration];
};
