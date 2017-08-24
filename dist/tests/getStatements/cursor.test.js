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
var assert = require("assert");
var lodash_1 = require("lodash");
var bluebird_1 = require("bluebird");
var setup_1 = require("../utils/setup");
var storeStatementsInService_1 = require("../utils/storeStatementsInService");
var createStatement_1 = require("../utils/createStatement");
var createClientModel_1 = require("../utils/createClientModel");
var TEST_ID_A = '1c86d8e9-f325-404f-b3d9-24c45103558A';
var TEST_ID_B = '1c86d8e9-f325-404f-b3d9-24c45103558B';
var TEST_CLIENT = createClientModel_1.default();
describe('get statements with cursors', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    it('should return correct statements when ascending cursor is used', function () { return __awaiter(_this, void 0, void 0, function () {
        var statement1, statement2, result1, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statement1 = createStatement_1.default({ id: TEST_ID_A });
                    statement2 = createStatement_1.default({ id: TEST_ID_B });
                    return [4 /*yield*/, storeStatements([statement1])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.delay(10)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([statement2])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, service.getStatements({
                            limit: 1,
                            client: TEST_CLIENT,
                            ascending: true,
                        })];
                case 4:
                    result1 = _a.sent();
                    assert.notEqual(result1.cursor, undefined);
                    assert(lodash_1.isArray(result1.statements), 'Expected an array of statements');
                    assert.deepEqual(result1.statements.map(function (statement) {
                        return statement.id;
                    }), [TEST_ID_A]);
                    return [4 /*yield*/, service.getStatements({
                            limit: 1,
                            client: TEST_CLIENT,
                            cursor: result1.cursor,
                            ascending: true,
                        })];
                case 5:
                    result2 = _a.sent();
                    assert.equal(result2.cursor, undefined);
                    assert(lodash_1.isArray(result2.statements), 'Expected an array of statements');
                    assert.deepEqual(result2.statements.map(function (statement) {
                        return statement.id;
                    }), [TEST_ID_B]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return correct statements when descending cursor is used', function () { return __awaiter(_this, void 0, void 0, function () {
        var statement1, statement2, result1, result2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    statement1 = createStatement_1.default({ id: TEST_ID_A });
                    statement2 = createStatement_1.default({ id: TEST_ID_B });
                    return [4 /*yield*/, storeStatements([statement1])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, bluebird_1.delay(10)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([statement2])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, service.getStatements({
                            limit: 1,
                            client: TEST_CLIENT,
                            ascending: false,
                        })];
                case 4:
                    result1 = _a.sent();
                    assert.notEqual(result1.cursor, undefined);
                    assert(lodash_1.isArray(result1.statements), 'Expected an array of statements');
                    assert.deepEqual(result1.statements.map(function (statement) {
                        return statement.id;
                    }), [TEST_ID_B]);
                    return [4 /*yield*/, service.getStatements({
                            limit: 1,
                            client: TEST_CLIENT,
                            ascending: false,
                            cursor: result1.cursor,
                        })];
                case 5:
                    result2 = _a.sent();
                    assert.equal(result2.cursor, undefined);
                    assert(lodash_1.isArray(result2.statements), 'Expected an array of statements');
                    assert.deepEqual(result2.statements.map(function (statement) {
                        return statement.id;
                    }), [TEST_ID_A]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=cursor.test.js.map