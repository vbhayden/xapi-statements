import BaseError from './BaseError';

export default class extends BaseError {
  constructor(hashes: string[]) {
    super(`Received missing attachments (${hashes.join(', ')})`);
  }
}
