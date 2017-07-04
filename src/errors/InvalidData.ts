import { Warning } from 'rulr';
import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public warnings: Warning[]) {
    super(`Invalid data ${JSON.stringify(warnings)}`);
  }
}
