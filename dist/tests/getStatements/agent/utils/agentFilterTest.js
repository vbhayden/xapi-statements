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
var setup_1 = require("../../../utils/setup");
var storeAwaitedStatements_1 = require("../../../utils/storeAwaitedStatements");
var createStatement_1 = require("../../../utils/createStatement");
var createClientModel_1 = require("../../../utils/createClientModel");
var TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_MISSING_ID = '1c86d8e9-f325-404f-b3d9-24c451035583';
var TEST_CLIENT = createClientModel_1.default();
exports.default = (function (assertFilteredStatements) {
    return function (createActor, relatedAgents) {
        var service = setup_1.default();
        var storeStatements = function (statements, authority) {
            return storeAwaitedStatements_1.default(service)({
                models: statements,
                attachments: [],
                client: createClientModel_1.default(authority ? { authority: authority } : {}),
            });
        };
        var createActorStatement = function (id, actor) {
            return createStatement_1.default(__assign({ id: id }, createActor(actor)));
        };
        var assertFilter = function (actor1, actor2) { return __awaiter(_this, void 0, void 0, function () {
            var statement1, statement2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        statement1 = createActorStatement(TEST_TARGET_ID, actor1);
                        statement2 = createActorStatement(TEST_MISSING_ID, actor2);
                        return [4 /*yield*/, storeStatements([statement1], statement1.authority)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, storeStatements([statement2], statement2.authority)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, assertFilteredStatements(service)({
                                agent: actor1,
                                related_agents: relatedAgents,
                                client: TEST_CLIENT,
                            }, [TEST_TARGET_ID])];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        it('should return statements when they match the account name', function () { return __awaiter(_this, void 0, void 0, function () {
            var account1, account2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account1 = { name: '1', homePage: 'http://www.example.com' };
                        account2 = { name: '2', homePage: 'http://www.example.com' };
                        return [4 /*yield*/, assertFilter({ account: account1 }, { account: account2 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return statements when they match the account homepage', function () { return __awaiter(_this, void 0, void 0, function () {
            var account1, account2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        account1 = { name: 'test', homePage: 'http://www.example.com/1' };
                        account2 = { name: 'test', homePage: 'http://www.example.com/2' };
                        return [4 /*yield*/, assertFilter({ account: account1 }, { account: account2 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return statements when they match the mbox', function () { return __awaiter(_this, void 0, void 0, function () {
            var mbox1, mbox2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mbox1 = 'mailto:test1@example.com';
                        mbox2 = 'mailto:test2@example.com';
                        return [4 /*yield*/, assertFilter({ mbox: mbox1 }, { mbox: mbox2 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return statements when they match the mbox_sha1sum', function () { return __awaiter(_this, void 0, void 0, function () {
            var mbox1, mbox2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mbox1 = 'e1f9bc64eefbdf3660690684c6184f594f9a5c17';
                        mbox2 = 'e1f9bc64eefbdf3660690684c6184f594f9a5c18';
                        return [4 /*yield*/, assertFilter({ mbox_sha1sum: mbox1 }, { mbox_sha1sum: mbox2 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return statements when they match the openid', function () { return __awaiter(_this, void 0, void 0, function () {
            var openid1, openid2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        openid1 = 'http://www.example.com/1';
                        openid2 = 'http://www.example.com/2';
                        return [4 /*yield*/, assertFilter({ openid: openid1 }, { openid: openid2 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
});
//# sourceMappingURL=agentFilterTest.js.map