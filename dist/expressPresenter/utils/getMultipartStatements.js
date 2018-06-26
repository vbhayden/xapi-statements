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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var streamToString = require("stream-to-string");
var InvalidBoundary_1 = require("../../errors/InvalidBoundary");
var InvalidContentTransferEncoding_1 = require("../../errors/InvalidContentTransferEncoding");
var NoStatements_1 = require("../../errors/NoStatements");
var contentTypePatterns_1 = require("../utils/contentTypePatterns");
var getParts_1 = require("../utils/getParts");
var parseJson_1 = require("../../utils/parseJson");
var BOUNDARY_REGEXP = /boundary\=((?:\"(?:[A-Za-z\d\'\(\)\+\_\,\-\.\/\:\=\?]+)\")|(?:[A-Za-z\d\-]+))/;
var getBoundaryFromContentType = function (contentType) {
    var result = BOUNDARY_REGEXP.exec(contentType);
    if (result === null || result.length < 1 || result.length > 2) {
        throw new InvalidBoundary_1.default(contentType);
    }
    return result[1].replace(/\"/g, '');
};
exports.default = (function (req) { return __awaiter(_this, void 0, void 0, function () {
    var contentType, boundary, parts, hasStatements, unparsedBody, body, attachments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contentType = req.header('Content-Type') || '';
                boundary = getBoundaryFromContentType(contentType);
                return [4 /*yield*/, getParts_1.default(req, boundary)];
            case 1:
                parts = _a.sent();
                hasStatements = (parts.length >= 1 &&
                    contentTypePatterns_1.jsonContentTypePattern.test(lodash_1.get(parts[0].headers, 'content-type', '')));
                if (!hasStatements) {
                    throw new NoStatements_1.default();
                }
                return [4 /*yield*/, streamToString(parts[0].stream)];
            case 2:
                unparsedBody = _a.sent();
                body = parseJson_1.default(unparsedBody, ['body']);
                attachments = parts.slice(1).map(function (part) {
                    var contentTransferEncoding = lodash_1.get(part.headers, 'content-transfer-encoding');
                    if (contentTransferEncoding !== 'binary') {
                        throw new InvalidContentTransferEncoding_1.default(contentTransferEncoding);
                    }
                    return {
                        stream: part.stream,
                        hash: lodash_1.get(part.headers, 'x-experience-api-hash'),
                        contentType: lodash_1.get(part.headers, 'content-type'),
                    };
                });
                return [2 /*return*/, { body: body, attachments: attachments }];
        }
    });
}); });
//# sourceMappingURL=getMultipartStatements.js.map