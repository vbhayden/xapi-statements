import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public hashes: string[]) {
    super();
    // `Received missing attachments (${hashes.join(', ')})`
  }
}
