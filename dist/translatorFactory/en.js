"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = require("jscommons/dist/translatorFactory/en");
var stringPath_1 = require("jscommons/dist/translatorFactory/utils/stringPath");
var translator = __assign({ changedStatementRefError: function (err) { return err.statementId + " is no longer a statement reference"; }, conflictError: function (err) { return err.statementId + " is conflicting"; }, dataBeforeFirstBoundaryError: function () { return 'There was data before the first boundary'; }, dataBeyondFinalBoundaryError: function () { return 'There was data beyond the final boundary'; }, duplicateIdError: function (err) { return err.statementId + " is duplicated in the current batch"; }, invalidBoundaryError: function (err) { return "Content-Type (" + err.contentType + ") contains an invalid boundary"; }, jsonSyntaxError: function (err) {
        var path = stringPath_1.default(err.path);
        return "Expected valid JSON in " + path;
    }, invalidContentTypeError: function (err) { return "Content-Type (" + err.contentType + ") is not supported"; }, invalidContentTransferEncodingError: function (err) {
        return "Content-Transfer-Encoding (" + err.contentTransferEncoding + ") is not supported";
    }, invalidMethodError: function (err) { return "Method (" + err.method + ") is invalid for alternate request syntax"; }, invalidVoidTypeError: function (err) { return "Voider 'objectType' ('" + err.objectType + ") must be 'StatementRef'"; }, missingAttachmentsError: function (err) { return "Received missing attachments (" + err.hashes.join(', ') + ")"; }, extraAttachmentsError: function (err) { return "Received extra attachments (" + err.hashes.join(', ') + ")"; }, missingLoadedIdError: function (err) { return "Eager loaded '" + err.targetId + "' is now missing"; }, missingStatementIdError: function () { return 'Missing required \'statementId\' query param'; }, noStatementsError: function () { return 'No statements in request content'; }, queryIdsError: function () { return 'Cannot use \'statementId\' and \'voidedStatementId\''; }, unknownParamsError: function (err) {
        return "Cannot use unknown params '" + err.unknownParams.join(', ') + "'";
    }, unequalStatementIdError: function (err) { return "Statement id must match the query param (" + err.statementId + ")"; }, voidingErrorError: function (err) {
        var voiders = err.voidedStatementIds.join(', ');
        return "Voider cannot void another voider (" + voiders + ")";
    }, invalidX5CTypeError: function (err) {
        return "X5C header should be an array for '" + err.statementId + "'";
    }, invalidX5CChainError: function (err) {
        return "X5C header should have at least one element for '" + err.statementId + "'";
    }, invalidJwsError: function (err) {
        return "Invalid JWS for '" + err.statementId + "'";
    }, invalidSignedStatementError: function (err) {
        return "Signed statement should match original statement for '" + err.statementId + "'";
    } }, en_1.default);
exports.default = translator;
//# sourceMappingURL=en.js.map