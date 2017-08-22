import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    unknownParams: string[];
    constructor(unknownParams: string[]);
}
