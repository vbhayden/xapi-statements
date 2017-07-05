import * as rulr from 'rulr';
import { statement as validateStatement } from 'xapi-validation/dist/factory';

const validateStatements = rulr.maybe(rulr.restrictToCollection(() => validateStatement));

export default (models: any[]) => {
  validateStatements(models, ['statements']);
};
