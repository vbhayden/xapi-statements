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
var createClientModel_1 = require("../utils/createClientModel");
var createStatement_1 = require("../utils/createStatement");
var storeStatementsInService_1 = require("../utils/storeStatementsInService");
var repo_1 = require("../../repo");
var index_1 = require("../../service/index");
var config_1 = require("../../config");
var tracker_1 = require("../../tracker");
var logger_1 = require("../../logger");
var TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_CLIENT = createClientModel_1.default();
var TEST_STATEMENT = {
    id: TEST_ID,
    timestamp: null,
    stored: null,
    version: null,
    verb: {
        id: 'http://www.example.org/verb',
        display: {
            en: 'test_verb'
        }
    },
    actor: {
        account: {
            homePage: 'http://www.example.org/user',
            name: 'test_user'
        },
        objectType: 'Agent'
    },
    object: {
        objectType: 'Activity',
        id: 'http://www.example.org/object',
        definition: {
            type: 'http://www.example.org/test_object_type',
            extensions: null,
            name: {
                en: 'test_name'
            },
            description: {
                en: 'test_description'
            }
        }
    },
    result: null,
    context: {
        registration: null,
        revision: null,
        platform: 'test_platform',
        language: null,
        instructor: null,
        team: null,
        statement: null,
        contextActivities: {
            parent: [
                null,
                {
                    objectType: 'Activity',
                    id: 'http://www.example.org/object',
                }
            ],
        },
        extensions: null,
    },
    authority: null,
    attachments: null,
};
var EXPECTED_TEST_STATEMENT = {
    id: TEST_STATEMENT.id,
    actor: TEST_STATEMENT.actor,
    verb: TEST_STATEMENT.verb,
    object: {
        objectType: TEST_STATEMENT.object.objectType,
        id: TEST_STATEMENT.object.id,
        definition: {
            type: TEST_STATEMENT.object.definition.type,
            name: TEST_STATEMENT.object.definition.name,
            description: TEST_STATEMENT.object.definition.description,
        }
    },
    context: {
        platform: TEST_STATEMENT.context.platform,
        contextActivities: {
            parent: [TEST_STATEMENT.context.contextActivities.parent[1]],
        },
    },
};
describe(__filename, function () {
    var service = index_1.default(__assign({}, config_1.default.service, { enableNullRemoval: true, repo: repo_1.default,
        tracker: tracker_1.default,
        logger: logger_1.default }));
    var storeStatements = storeStatementsInService_1.default(service);
    var getStatement = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.getStatement({ id: TEST_ID, voided: false, client: TEST_CLIENT })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.statements[0]];
            }
        });
    }); };
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.clearService()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should remove nulls when nulls are provided', function () { return __awaiter(_this, void 0, void 0, function () {
        var actualStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements([createStatement_1.default(TEST_STATEMENT)])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getStatement()];
                case 2:
                    actualStatement = _a.sent();
                    assert.deepEqual(actualStatement, __assign({}, actualStatement, EXPECTED_TEST_STATEMENT));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=removeNulls.test.js.map