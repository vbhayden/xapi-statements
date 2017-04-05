import { Warning } from 'rulr';
import { statement as validateStatement } from 'xapi-validation/dist/factory';
import InvalidData from '../../errors/InvalidData';

export default (models: any[]) => {
  const warnings: Warning[] = ([] as Warning[]).concat(...models.map((model, index) => {
    return validateStatement(model, [index.toString()]);
  }));
  if (warnings.length > 0) throw new InvalidData(warnings);
};
