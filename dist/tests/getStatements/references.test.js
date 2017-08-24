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
var setup_1 = require("../utils/setup");
var createClientModel_1 = require("../utils/createClientModel");
var storeStatementsInService_1 = require("../utils/storeStatementsInService");
var createReferenceStatement_1 = require("./utils/createReferenceStatement");
var assertFilteredStatements_1 = require("./utils/assertFilteredStatements");
var delay_1 = require("./utils/delay");
var TEST_ID_A = '1c86d8e9-f325-404f-b3d9-24c45103558A';
var TEST_ID_B = '1c86d8e9-f325-404f-b3d9-24c45103558B';
var TEST_ID_C = '1c86d8e9-f325-404f-b3d9-24c45103558C';
var TEST_ID_D = '1c86d8e9-f325-404f-b3d9-24c45103558D';
var TEST_CLIENT = createClientModel_1.default();
describe('get statements by references', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var createAgentFilter = function (targetId) {
        return {
            account: {
                homePage: 'http://www.example.com',
                name: targetId
            }
        };
    };
    var assertTargetingStatement = function (targetId, expectedIds) {
        return assertFilteredStatements_1.default(service)({
            agent: createAgentFilter(targetId),
            client: TEST_CLIENT
        }, expectedIds);
    };
    it('should return no statements when targeted statement is not stored', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_A, [TEST_ID_A])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_B, [])];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return both statements when they reference each other in one batch', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([
                        createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B),
                        createReferenceStatement_1.default(TEST_ID_B, TEST_ID_A)
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_A, [TEST_ID_B, TEST_ID_A])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_B, [TEST_ID_B, TEST_ID_A])];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return both statements when they reference each other in two batches', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_B, TEST_ID_A)])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_A, [TEST_ID_B, TEST_ID_A])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_B, [TEST_ID_B, TEST_ID_A])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return three statements when two target one', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([
                        createReferenceStatement_1.default(TEST_ID_A, TEST_ID_C),
                        createReferenceStatement_1.default(TEST_ID_B, TEST_ID_C),
                        createReferenceStatement_1.default(TEST_ID_C, TEST_ID_D)
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_C, [TEST_ID_C, TEST_ID_B, TEST_ID_A])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_B, [TEST_ID_B])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_A, [TEST_ID_A])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return all statements when the references cycle', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([
                        createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B),
                        createReferenceStatement_1.default(TEST_ID_B, TEST_ID_C),
                        createReferenceStatement_1.default(TEST_ID_C, TEST_ID_A)
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_A, [TEST_ID_C, TEST_ID_B, TEST_ID_A])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_B, [TEST_ID_C, TEST_ID_B, TEST_ID_A])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, assertTargetingStatement(TEST_ID_C, [TEST_ID_C, TEST_ID_B, TEST_ID_A])];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not return the source when the since option excludes it', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, statement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, delay_1.default(1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_B, TEST_ID_A)])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, service.getStatement({
                            id: TEST_ID_A,
                            voided: false,
                            client: TEST_CLIENT
                        })];
                case 4:
                    result = _a.sent();
                    statement = result.statements[0];
                    return [4 /*yield*/, assertFilteredStatements_1.default(service)({
                            agent: createAgentFilter(TEST_ID_B),
                            since: statement.stored,
                            client: TEST_CLIENT
                        }, [TEST_ID_B])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not return the target when the until option excludes it', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, statement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, delay_1.default(1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, storeStatements([createReferenceStatement_1.default(TEST_ID_B, TEST_ID_A)])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, service.getStatement({
                            id: TEST_ID_A,
                            voided: false,
                            client: TEST_CLIENT
                        })];
                case 4:
                    result = _a.sent();
                    statement = result.statements[0];
                    return [4 /*yield*/, assertFilteredStatements_1.default(service)({
                            agent: createAgentFilter(TEST_ID_B),
                            until: statement.stored,
                            client: TEST_CLIENT
                        }, [TEST_ID_A])];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not return the target when the limit option excludes it', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([
                        createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B),
                        createReferenceStatement_1.default(TEST_ID_B, TEST_ID_A)
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertFilteredStatements_1.default(service)({
                            agent: createAgentFilter(TEST_ID_B),
                            limit: 1,
                            client: TEST_CLIENT
                        }, [TEST_ID_B])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not return the source when the skip option excludes it', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([
                        createReferenceStatement_1.default(TEST_ID_A, TEST_ID_B),
                        createReferenceStatement_1.default(TEST_ID_B, TEST_ID_A)
                    ])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertFilteredStatements_1.default(service)({
                            agent: createAgentFilter(TEST_ID_B),
                            skip: 1,
                            client: TEST_CLIENT
                        }, [TEST_ID_A])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=references.test.js.map