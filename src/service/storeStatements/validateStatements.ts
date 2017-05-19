import { Warning } from 'rulr';
import { statement as validateStatement } from 'xapi-validation/dist/factory';
import InvalidData from '../../errors/InvalidData';

export default (models: any[]) => {
  const modelWarnings: Warning[][] = models.map((model, index): Warning[] => {
    return validateStatement(model, [index.toString()]);
  });
  const warnings: Warning[] = ([] as Warning[]).concat(...modelWarnings);
  if (warnings.length > 0) throw new InvalidData(warnings);
};
