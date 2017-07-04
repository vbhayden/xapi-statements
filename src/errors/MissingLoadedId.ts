import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public targetId: string) {
    super(`Eager loaded '${targetId}' is now missing`);
  }
}
