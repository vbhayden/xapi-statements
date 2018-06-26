import BaseError from 'jscommons/dist/errors/BaseError';
export default class extends BaseError {
    objectType: string;
    constructor(objectType: string);
}
