import { intersection } from 'lodash';
import Forbidden from 'jscommons/dist/errors/Forbidden';

export default (expectedScopes: string[], actualScopes: string[]): void => {
  const allowedScopes = intersection(expectedScopes, actualScopes);
  const hasAllowedScopes = allowedScopes.length > 0;

  if (!hasAllowedScopes) {
    throw new Forbidden();
  }
};
