"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var checkScopes_1 = require("jscommons/dist/service/utils/checkScopes");
var stream_1 = require("stream");
var scopes_1 = require("../../utils/scopes");
var preValidationSetup_1 = require("./preValidationSetup");
var validateStatements_1 = require("./validateStatements");
var postValidationSetup_1 = require("./postValidationSetup");
var getUnstoredModels_1 = require("./getUnstoredModels");
var checkAttachments_1 = require("./checkAttachments");
var checkVoiders_1 = require("./checkVoiders");
var createAttachments_1 = require("./createAttachments");
var createStatements_1 = require("./createStatements");
var voidStatements_1 = require("./voidStatements");
var updateReferences_1 = require("./updateReferences");
var updateFullActivities_1 = require("./updateFullActivities");
/* istanbul ignore next */
var awaitUpdates = function (config, updates) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(config.awaitUpdates === true)) return [3 /*break*/, 2];
                return [4 /*yield*/, updates];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var cloneAttachments = function (attachmentModels) {
    return attachmentModels.map(function (attachmentModel) {
        return __assign({}, attachmentModel, { stream: attachmentModel.stream.pipe(new stream_1.PassThrough()) });
    });
};
exports.default = function (config) {
    return function (opts) { return __awaiter(_this, void 0, void 0, function () {
        var preValidatedModels, attachments, clonedAttachments, postValidatedModels, unstoredModels, voidedObjectIds, statementIds, unawaitedUpdates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checkScopes_1.default(scopes_1.STATEMENT_WRITE_SCOPES, opts.client.scopes);
                    preValidatedModels = preValidationSetup_1.default(opts.models);
                    validateStatements_1.default(preValidatedModels);
                    attachments = cloneAttachments(opts.attachments);
                    clonedAttachments = cloneAttachments(opts.attachments);
                    return [4 /*yield*/, postValidationSetup_1.default(preValidatedModels, clonedAttachments, opts.client)];
                case 1:
                    postValidatedModels = _a.sent();
                    return [4 /*yield*/, getUnstoredModels_1.default(config, postValidatedModels, opts.client)];
                case 2:
                    unstoredModels = _a.sent();
                    return [4 /*yield*/, checkVoiders_1.default(config, unstoredModels, opts.client)];
                case 3:
                    voidedObjectIds = _a.sent();
                    checkAttachments_1.default(config, unstoredModels, attachments);
                    return [4 /*yield*/, createStatements_1.default(config, unstoredModels)];
                case 4:
                    _a.sent();
                    statementIds = postValidatedModels.map(function (postValidatedModel) {
                        return postValidatedModel.statement.id;
                    });
                    unawaitedUpdates = Promise.all([
                        createAttachments_1.default(config, attachments),
                        voidStatements_1.default(config, unstoredModels, voidedObjectIds, opts.client),
                        updateReferences_1.default(config, unstoredModels, opts.client),
                        updateFullActivities_1.default({ config: config, models: unstoredModels, client: opts.client }),
                    ]);
                    return [4 /*yield*/, awaitUpdates(config, unawaitedUpdates)];
                case 5:
                    _a.sent();
                    config.repo.emitNewStatements({ ids: statementIds });
                    return [2 /*return*/, statementIds];
            }
        });
    }); };
};
//# sourceMappingURL=index.js.map