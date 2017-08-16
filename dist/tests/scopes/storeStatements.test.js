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
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var Forbidden_1 = require("jscommons/dist/errors/Forbidden");
var scopes = require("../../utils/scopes");
var scopes_1 = require("../../utils/scopes");
var setup_1 = require("../utils/setup");
var createClientModel_1 = require("../utils/createClientModel");
var TEST_FORBIDDEN_SCOPES = lodash_1.difference(scopes_1.default, scopes.STATEMENT_WRITE_SCOPES);
describe('store statements with scopes', function () {
    var service = setup_1.default();
    var testWriteScope = function (scopes) { return __awaiter(_this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = createClientModel_1.default({ _id: 'test_client_b', scopes: scopes });
                    return [4 /*yield*/, service.storeStatements({
                            models: [],
                            attachments: [],
                            client: client,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    it('should create statements when using xAPI all scope', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWriteScope([scopes.XAPI_ALL])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a statement when using xAPI write statements scope', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWriteScope([scopes.XAPI_STATEMENTS_WRITE])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw an error when using a forbidden write scope', function () { return __awaiter(_this, void 0, void 0, function () {
        var client, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = createClientModel_1.default({
                        _id: 'test_client_b',
                        scopes: TEST_FORBIDDEN_SCOPES,
                    });
                    promise = service.storeStatements({
                        models: [],
                        attachments: [],
                        client: client,
                    });
                    return [4 /*yield*/, assertError_1.default(Forbidden_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=storeStatements.test.js.map