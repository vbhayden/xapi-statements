import BaseError from './BaseError';

export default class extends BaseError {
  constructor(hash: string) {
    super(`Received a hash (${hash}) not in the given attachments`);
  }
}
