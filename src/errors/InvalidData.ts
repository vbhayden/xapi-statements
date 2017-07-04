import { Warning } from 'rulr';
import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public warnings: Warning[]) {
    super();
    // `Invalid data ${JSON.stringify(warnings)}`
  }
}
