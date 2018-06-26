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
var assert = require("assert");
var lodash_1 = require("lodash");
var setup_1 = require("../../../utils/setup");
var createClientModel_1 = require("../../../utils/createClientModel");
var createStatement_1 = require("../../../utils/createStatement");
var storeStatementsInService_1 = require("../../../utils/storeStatementsInService");
var TEST_LANG_1 = 'en-GB';
var TEST_LANG_2 = 'en-US';
var TEST_LANG_3 = 'en';
var TEST_TEXT_1 = 'test1';
var TEST_TEXT_2 = 'test2';
var TEST_CLIENT = createClientModel_1.default();
exports.default = (function (createLangMapStatement) {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var assertCanonicalStatement = function (exactStatement, canonicalStatement, langs) { return __awaiter(_this, void 0, void 0, function () {
        var ids, result, canonicalStatements, expectedStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([exactStatement])];
                case 1:
                    ids = _a.sent();
                    return [4 /*yield*/, service.getStatement({
                            langs: langs,
                            format: 'canonical',
                            client: TEST_CLIENT,
                            id: ids[0],
                            voided: false
                        })];
                case 2:
                    result = _a.sent();
                    canonicalStatements = result.statements;
                    expectedStatement = lodash_1.merge({}, canonicalStatements[0], canonicalStatement);
                    assert(lodash_1.isArray(canonicalStatements));
                    assert.equal(canonicalStatements.length, 1);
                    assert.deepEqual(canonicalStatements[0], expectedStatement);
                    return [2 /*return*/];
            }
        });
    }); };
    var assertCanonicalLangMap = function (exactLangMap, canonicalLangMap, langs) { return __awaiter(_this, void 0, void 0, function () {
        var exactStatement, canonicalStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exactStatement = createStatement_1.default(createLangMapStatement(exactLangMap));
                    canonicalStatement = createStatement_1.default(createLangMapStatement(canonicalLangMap));
                    return [4 /*yield*/, assertCanonicalStatement(exactStatement, canonicalStatement, langs)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    it('should return the canonical lang map when langs match', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, assertCanonicalLangMap((_a = {},
                        _a[TEST_LANG_1] = TEST_TEXT_1,
                        _a[TEST_LANG_2] = TEST_TEXT_2,
                        _a), (_b = {},
                        _b[TEST_LANG_1] = TEST_TEXT_1,
                        _b), [TEST_LANG_2, TEST_LANG_1])];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the original lang map when langs are not matching', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, langMap;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    langMap = (_a = {},
                        _a[TEST_LANG_1] = TEST_TEXT_1,
                        _a[TEST_LANG_2] = TEST_TEXT_2,
                        _a);
                    return [4 /*yield*/, assertCanonicalLangMap(langMap, langMap, [TEST_LANG_3])];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=canonicalTest.js.map