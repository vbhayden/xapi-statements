import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public contentType: string) {
    super(`Content-Type (${contentType}) did not contain a valid boundary.`);
  }
}
