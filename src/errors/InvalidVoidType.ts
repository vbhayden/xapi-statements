import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public objectType: string) {
    super(`The 'objectType' of a voider must be 'StatementRef' not '${objectType}'`);
  }
}
