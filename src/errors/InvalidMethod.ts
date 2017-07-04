import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public method: string) {
    super(`Method (${method}) is invalid for alternate request syntax`);
  }
}
