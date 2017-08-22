import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    contentTypeEncoding: string;
    constructor(contentTypeEncoding?: string);
}
