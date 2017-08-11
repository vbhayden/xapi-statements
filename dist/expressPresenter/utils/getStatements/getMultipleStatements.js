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
var bluebird_1 = require("bluebird");
var getMoreLink_1 = require("./getMoreLink");
var getStatementsOptions_1 = require("./getStatementsOptions");
var getStatementsResultOptions_1 = require("./getStatementsResultOptions");
exports.default = function (opts) { return __awaiter(_this, void 0, void 0, function () {
    var queryParams, config, res, client, timestamp, xapiVersion, resultOpts, statementsOpts, results, moreLink, statementResult, boundary, crlf_1, fullBoundary_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryParams = opts.queryParams, config = opts.config, res = opts.res, client = opts.client;
                timestamp = new Date().toISOString();
                xapiVersion = '1.0.0';
                resultOpts = getStatementsResultOptions_1.default(queryParams);
                statementsOpts = getStatementsOptions_1.default(queryParams);
                return [4 /*yield*/, config.service.getStatements(__assign({ client: client }, statementsOpts, resultOpts))];
            case 1:
                results = _a.sent();
                moreLink = getMoreLink_1.default({ results: results, resultOpts: resultOpts, statementsOpts: statementsOpts });
                statementResult = {
                    more: moreLink,
                    statements: results.statements,
                };
                if (!resultOpts.attachments) return [3 /*break*/, 3];
                boundary = 'abcABC0123\'()+_,-./:=?';
                crlf_1 = '\r\n';
                fullBoundary_1 = crlf_1 + "--" + boundary + crlf_1;
                res.setHeader('X-Experience-API-Consistent-Through', timestamp);
                res.setHeader('X-Experience-API-Version', xapiVersion);
                res.setHeader('Content-Type', "multipart/mixed; charset=UTF-8; boundary=\"" + boundary + "\"");
                res.status(200);
                res.write(fullBoundary_1);
                res.write("Content-Type:application/json" + crlf_1 + crlf_1);
                res.write(JSON.stringify(statementResult));
                res.write(crlf_1);
                return [4 /*yield*/, bluebird_1.reduce(results.attachments, function (_result, attachment) {
                        return new Promise(function (resolve, reject) {
                            res.write(fullBoundary_1);
                            res.write("Content-Type:" + attachment.contentType + crlf_1);
                            res.write("Content-Transfer-Encoding:binary" + crlf_1);
                            res.write("X-Experience-API-Hash:" + attachment.hash + crlf_1);
                            res.write(crlf_1);
                            attachment.stream.on('data', function (data) {
                                res.write(data);
                            });
                            attachment.stream.on('end', function () {
                                res.write(crlf_1);
                                resolve();
                            });
                            attachment.stream.on('error', function (err) {
                                reject(err);
                            });
                        });
                    }, Promise.resolve())];
            case 2:
                _a.sent();
                res.write("--" + boundary + "--");
                res.end();
                return [2 /*return*/];
            case 3:
                res
                    .set('X-Experience-API-Consistent-Through', timestamp)
                    .set('X-Experience-API-Version', xapiVersion)
                    .status(200)
                    .json(statementResult);
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=getMultipleStatements.js.map