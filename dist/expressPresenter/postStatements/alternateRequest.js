"use strict";
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
var lodash_1 = require("lodash");
var InvalidContentType_1 = require("../../errors/InvalidContentType");
var InvalidMethod_1 = require("../../errors/InvalidMethod");
var getClient_1 = require("../utils/getClient");
var getStatements_1 = require("../utils/getStatements");
var storeStatement_1 = require("../utils/storeStatement");
var storeStatements_1 = require("./storeStatements");
var validateHeaderVersion_1 = require("../utils/validateHeaderVersion");
var getUrlPath_1 = require("../utils/getUrlPath");
var checkUnknownParams_1 = require("../utils/checkUnknownParams");
var parseJson_1 = require("../../utils/parseJson");
var checkContentType = function (req) {
    var contentType = req.body['Content-Type'] || 'application/json';
    if (contentType !== 'application/json') {
        throw new InvalidContentType_1.default(req.body['Content-Type']);
    }
};
var getBodyContent = function (req) {
    var unparsedBody = req.body.content;
    var body = parseJson_1.default(unparsedBody, ['body', 'content']);
    return body;
};
var getHeader = function (req, name) {
    return req.body[name] || req.header(name) || '';
};
exports.default = function (_a) {
    var config = _a.config, method = _a.method, req = _a.req, res = _a.res;
    return __awaiter(_this, void 0, void 0, function () {
        var _a, client, body, urlPath, client, acceptedLangs, queryParams, client, body, queryParams;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    checkUnknownParams_1.default(req.query, ['method']);
                    _a = method;
                    switch (_a) {
                        case 'POST': return [3 /*break*/, 1];
                        case 'GET': return [3 /*break*/, 3];
                        case 'PUT': return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1:
                    checkContentType(req);
                    return [4 /*yield*/, getClient_1.default(config, getHeader(req, 'Authorization'))];
                case 2:
                    client = _b.sent();
                    validateHeaderVersion_1.default(getHeader(req, 'X-Experience-API-Version'));
                    body = getBodyContent(req);
                    return [2 /*return*/, storeStatements_1.default({ config: config, client: client, body: body, attachments: [], res: res })];
                case 3:
                    urlPath = getUrlPath_1.default(req);
                    return [4 /*yield*/, getClient_1.default(config, getHeader(req, 'Authorization'))];
                case 4:
                    client = _b.sent();
                    validateHeaderVersion_1.default(getHeader(req, 'X-Experience-API-Version'));
                    acceptedLangs = lodash_1.defaultTo(req.header('Accept-Language'), '');
                    queryParams = req.body;
                    return [2 /*return*/, getStatements_1.default({ config: config, res: res, client: client, queryParams: queryParams, urlPath: urlPath, acceptedLangs: acceptedLangs })];
                case 5:
                    checkContentType(req);
                    return [4 /*yield*/, getClient_1.default(config, getHeader(req, 'Authorization'))];
                case 6:
                    client = _b.sent();
                    validateHeaderVersion_1.default(getHeader(req, 'X-Experience-API-Version'));
                    body = getBodyContent(req);
                    queryParams = req.body;
                    return [2 /*return*/, storeStatement_1.default({ config: config, client: client, body: body, attachments: [], queryParams: queryParams, res: res })];
                case 7:
                    {
                        throw new InvalidMethod_1.default(method);
                    }
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=alternateRequest.js.map