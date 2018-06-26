import BaseError from 'jscommons/dist/errors/BaseError';
export default class extends BaseError {
    statementId: string;
    algorithm: string;
    constructor(statementId: string, algorithm: string);
}
