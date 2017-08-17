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
var scopes_1 = require("../utils/scopes");
var getNumberOption_1 = require("jscommons/dist/config/getNumberOption");
var getStatementsResult_1 = require("./utils/getStatementsResult");
var getLimit = function (val) {
    var defaultLimit = 100;
    var limit = getNumberOption_1.default(val, defaultLimit);
    if (limit === 0) {
        return defaultLimit;
    }
    return limit;
};
exports.default = function (config) {
    return function (opts) { return __awaiter(_this, void 0, void 0, function () {
        var limit, models, hasMoreModels, cursor, resultModels, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    checkScopes_1.default(scopes_1.STATEMENT_READ_SCOPES, opts.client.scopes);
                    limit = getLimit(opts.limit);
                    return [4 /*yield*/, config.repo.getStatements({
                            agent: opts.agent,
                            activity: opts.activity,
                            verb: opts.verb,
                            relatedAgents: opts.relatedAgents,
                            relatedActivities: opts.relatedActivities,
                            registration: opts.registration,
                            since: opts.since,
                            until: opts.until,
                            ascending: opts.ascending === undefined ? true : opts.ascending,
                            limit: limit + 1,
                            skip: opts.skip,
                            client: opts.client,
                            cursor: opts.cursor,
                        })];
                case 1:
                    models = _a.sent();
                    hasMoreModels = models.length > limit;
                    cursor = hasMoreModels ? models[models.length - 2]._id : undefined;
                    resultModels = hasMoreModels ? models.slice(0, models.length - 1) : models;
                    return [4 /*yield*/, getStatementsResult_1.default(config, opts, resultModels)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, __assign({}, result, { cursor: cursor })];
            }
        });
    }); };
};
//# sourceMappingURL=getStatements.js.map