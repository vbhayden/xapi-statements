import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    contentTransferEncoding: string;
    constructor(contentTransferEncoding?: string);
}
