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
var setup_1 = require("../utils/setup");
var createStatement_1 = require("../utils/createStatement");
var createSubStatement_1 = require("../utils/createSubStatement");
var createContext_1 = require("../utils/createContext");
var createClientModel_1 = require("../utils/createClientModel");
var storeStatementsInService_1 = require("../utils/storeStatementsInService");
var TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_ACTIVITY = {
    objectType: 'Activity',
    id: 'http://www.example.com',
};
describe('store statement with context', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var assertContext = function (context, expectedContextActivities) {
        if (context !== undefined && context.contextActivities !== undefined) {
            assert.deepEqual(context.contextActivities, expectedContextActivities);
        }
        else {
            /* istanbul ignore next */
            assert(false, 'Expected context activities to be defined');
        }
    };
    var getStatement = function () { return __awaiter(_this, void 0, void 0, function () {
        var client, result, statement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = createClientModel_1.default();
                    return [4 /*yield*/, service.getStatement({
                            id: TEST_ID,
                            voided: false,
                            client: client,
                        })];
                case 1:
                    result = _a.sent();
                    statement = result.statements[0];
                    return [2 /*return*/, statement];
            }
        });
    }); };
    var testWrappedContext = function (key) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, expectedContextActivities, statement;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    expectedContextActivities = (_a = {}, _a[key] = [TEST_ACTIVITY], _a);
                    return [4 /*yield*/, storeStatements([createStatement_1.default(__assign({ id: TEST_ID }, createContext_1.default((_b = {},
                                _b[key] = TEST_ACTIVITY,
                                _b))))])];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, getStatement()];
                case 2:
                    statement = _c.sent();
                    assertContext(statement.context, expectedContextActivities);
                    return [2 /*return*/];
            }
        });
    }); };
    var testWrappedSubContext = function (key) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, expectedContextActivities, statement;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    expectedContextActivities = (_a = {}, _a[key] = [TEST_ACTIVITY], _a);
                    return [4 /*yield*/, storeStatements([createStatement_1.default(__assign({ id: TEST_ID }, createSubStatement_1.default(createContext_1.default((_b = {},
                                _b[key] = TEST_ACTIVITY,
                                _b)))))])];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, getStatement()];
                case 2:
                    statement = _c.sent();
                    if (statement.object.objectType === 'SubStatement') {
                        assertContext(statement.object.context, expectedContextActivities);
                    }
                    else {
                        /* istanbul ignore next */
                        assert(false, 'Expected sub statement');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    it('should wrap a statement\'s parent in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedContext('parent')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a statement\'s grouping in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedContext('grouping')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a statement\'s category in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedContext('category')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a statement\'s other in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedContext('other')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a sub statement\'s parent in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedSubContext('parent')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a sub statement\'s grouping in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedSubContext('grouping')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a sub statement\'s category in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedSubContext('category')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should wrap a sub statement\'s other in an array when given an object', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testWrappedSubContext('other')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=context.test.js.map