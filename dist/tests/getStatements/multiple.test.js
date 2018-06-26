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
var setup_1 = require("../utils/setup");
var createClientModel_1 = require("../utils/createClientModel");
var createStatement_1 = require("../utils/createStatement");
var storeStatementsInService_1 = require("../utils/storeStatementsInService");
var assertFilteredStatements_1 = require("./utils/assertFilteredStatements");
var TEST_TARGET_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_MISSING_ID1 = '1c86d8e9-f325-404f-b3d9-24c451035583';
var TEST_MISSING_ID2 = '1c86d8e9-f325-404f-b3d9-24c451035584';
var TEST_MISSING_ID3 = '1c86d8e9-f325-404f-b3d9-24c451035585';
var TEST_TARGET_ACTOR = { objectType: 'Agent', mbox: 'mailto:target@example.com' };
var TEST_MISSING_ACTOR = { objectType: 'Agent', mbox: 'mailto:missing@example.com' };
var TEST_TARGET_VERB_ID = 'http://www.example.com/object/1';
var TEST_MISSING_VERB_ID = 'http://www.example.com/object/2';
var TEST_TARGET_ACTIVITY = 'http://www.example.com/object/1';
var TEST_MISSING_ACTIVITY = 'http://www.example.com/object/2';
var TEST_CLIENT = createClientModel_1.default();
describe('get statements on multiple filters', function () {
    var service = setup_1.default();
    var storeStatements = storeStatementsInService_1.default(service);
    var filterStatements = function (statements) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, storeStatements(statements)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertFilteredStatements_1.default(service)({
                            agent: TEST_TARGET_ACTOR,
                            activity: TEST_TARGET_ACTIVITY,
                            verb: TEST_TARGET_VERB_ID,
                            client: TEST_CLIENT,
                        }, [TEST_TARGET_ID])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    it('should return statements when they match the verb, activity and agent', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, filterStatements([
                        createStatement_1.default({
                            id: TEST_MISSING_ID1,
                            actor: TEST_MISSING_ACTOR,
                            verb: { id: TEST_TARGET_VERB_ID },
                            object: { id: TEST_TARGET_ACTIVITY }
                        }),
                        createStatement_1.default({
                            id: TEST_MISSING_ID2,
                            actor: TEST_TARGET_ACTOR,
                            verb: { id: TEST_MISSING_VERB_ID },
                            object: { id: TEST_TARGET_ACTIVITY }
                        }),
                        createStatement_1.default({
                            id: TEST_TARGET_ID,
                            actor: TEST_TARGET_ACTOR,
                            verb: { id: TEST_TARGET_VERB_ID },
                            object: { id: TEST_TARGET_ACTIVITY }
                        }),
                        createStatement_1.default({
                            id: TEST_MISSING_ID3,
                            actor: TEST_TARGET_ACTOR,
                            verb: { id: TEST_TARGET_VERB_ID },
                            object: { id: TEST_MISSING_ACTIVITY }
                        }),
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=multiple.test.js.map