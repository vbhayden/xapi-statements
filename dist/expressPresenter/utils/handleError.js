"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var handleError_1 = require("jscommons/dist/expressPresenter/utils/handleError");
var sendMessage_1 = require("jscommons/dist/expressPresenter/utils/sendMessage");
var ChangedStatementRef_1 = require("../../errors/ChangedStatementRef");
var Conflict_1 = require("../../errors/Conflict");
var DataBeforeFirstBoundary_1 = require("../../errors/DataBeforeFirstBoundary");
var DataBeyondFinalBoundary_1 = require("../../errors/DataBeyondFinalBoundary");
var DuplicateId_1 = require("../../errors/DuplicateId");
var InvalidBoundary_1 = require("../../errors/InvalidBoundary");
var InvalidContentType_1 = require("../../errors/InvalidContentType");
var InvalidMethod_1 = require("../../errors/InvalidMethod");
var InvalidVoidType_1 = require("../../errors/InvalidVoidType");
var MissingAttachments_1 = require("../../errors/MissingAttachments");
var MissingLoadedId_1 = require("../../errors/MissingLoadedId");
var MissingStatementId_1 = require("../../errors/MissingStatementId");
var NoStatements_1 = require("../../errors/NoStatements");
var QueryIds_1 = require("../../errors/QueryIds");
var UnknownParams_1 = require("../../errors/UnknownParams");
var UnequalStatementId_1 = require("../../errors/UnequalStatementId");
var VoidingError_1 = require("../../errors/VoidingError");
var constants_1 = require("../../utils/constants");
exports.default = function (_a) {
    var translator = _a.translator, errorId = _a.errorId, res = _a.res, err = _a.err;
    var timestamp = new Date().toISOString();
    res.setHeader('X-Experience-API-Consistent-Through', timestamp);
    res.setHeader('X-Experience-API-Version', constants_1.xapiHeaderVersion);
    if (lodash_1.isNull(err) || lodash_1.isUndefined(null)) {
        var code = 500;
        var message = translator.serverError();
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    switch (err.constructor) {
        case ChangedStatementRef_1.default: {
            var code = 500;
            var message = translator.changedStatementRefError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case Conflict_1.default: {
            var code = 409;
            var message = translator.conflictError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case DataBeforeFirstBoundary_1.default: {
            var code = 400;
            var message = translator.dataBeforeFirstBoundaryError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case DataBeyondFinalBoundary_1.default: {
            var code = 400;
            var message = translator.dataBeyondFinalBoundaryError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case DuplicateId_1.default: {
            var code = 400;
            var message = translator.duplicateIdError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case InvalidBoundary_1.default: {
            var code = 400;
            var message = translator.invalidBoundaryError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case InvalidContentType_1.default: {
            var code = 400;
            var message = translator.invalidContentTypeError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case InvalidMethod_1.default: {
            var code = 400;
            var message = translator.invalidMethodError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case InvalidVoidType_1.default: {
            var code = 400;
            var message = translator.invalidVoidTypeError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case MissingAttachments_1.default: {
            var code = 400;
            var message = translator.missingAttachmentsError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case MissingLoadedId_1.default: {
            var code = 500;
            var message = translator.missingLoadedIdError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case MissingStatementId_1.default: {
            var code = 400;
            var message = translator.missingStatementIdError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case NoStatements_1.default: {
            var code = 400;
            var message = translator.noStatementsError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case QueryIds_1.default: {
            var code = 400;
            var message = translator.queryIdsError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case UnknownParams_1.default: {
            var code = 400;
            var message = translator.unknownParamsError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case UnequalStatementId_1.default: {
            var code = 400;
            var message = translator.unequalStatementIdError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case VoidingError_1.default: {
            var code = 400;
            var message = translator.voidingErrorError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        default: {
            return handleError_1.default({ translator: translator, errorId: errorId, res: res, err: err });
        }
    }
};
//# sourceMappingURL=handleError.js.map