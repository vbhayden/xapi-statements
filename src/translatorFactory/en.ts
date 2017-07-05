import commonTranslator from 'jscommons/dist/translatorFactory/en';
import Translator from './Translator';

const translator: Translator = {
  changedStatementRefError: (err) => `${err.statementId} is no longer a statement reference`,
  conflictError: (err) => `${err.statementId} is conflicting`,
  dataBeforeFirstBoundaryError: () => 'There was data before the first boundary',
  dataBeyondFinalBoundaryError: () => 'There was data beyond the final boundary',
  duplicateIdError: (err) => `${err.statementId} is duplicated in the current batch`,
  invalidBoundaryError: (err) => `Content-Type (${err.contentType}) contains an invalid boundary`,
  invalidContentTypeError: (err) => `Content-Type (${err.contentType}) is not supported`,
  invalidMethodError: (err) => `Method (${err.method}) is invalid for alternate request syntax`,
  invalidVoidTypeError: (err) => `Voider 'objectType' ('${err.objectType}) must be 'StatementRef'`,
  missingAttachmentsError: (err) => `Received missing attachments (${err.hashes.join(', ')})`,
  missingLoadedIdError: (err) => `Eager loaded '${err.targetId}' is now missing`,
  missingStatementIdError: () => 'Missing required \'statementId\' query param',
  noStatementsError: () => 'No statements in request content',
  queryIdsError: () => 'Cannot use \'statementId\' and \'voidedStatementId\'',
  queryOptionsError: (err) => {
    return `'statementId' or 'voidedStatementId' can't be used with '${err.opts.join(', ')}'`;
  },
  unequalStatementIdError: (err) => `Statement id must match the query param (${err.statementId})`,
  voidingErrorError: (err) => {
    const voiders = err.voidedStatementIds.join(', ');
    return `Voider cannot void another voider (${voiders})`;
  },
  ...commonTranslator,
};

export default translator;
