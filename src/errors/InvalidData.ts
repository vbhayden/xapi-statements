import { Warning } from 'rulr';
import BaseError from './BaseError';

export default class extends BaseError {
  public warnings: Warning[];

  constructor(warnings: Warning[]) {
    super(`Invalid data ${JSON.stringify(warnings)}`);
    this.warnings = warnings;
  }
}
