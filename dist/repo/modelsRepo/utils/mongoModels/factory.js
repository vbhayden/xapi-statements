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
var mongo_1 = require("../../createStatements/mongo");
var mongo_2 = require("../../getFullActivity/mongo");
var mongo_3 = require("../../getHashes/mongo");
var mongo_4 = require("../../getStatement/mongo");
var mongo_5 = require("../../getStatements/mongo");
var mongo_6 = require("../../getVoidersByObjectIds/mongo");
var mongo_7 = require("../../getVoidersByIds/mongo");
var mongo_8 = require("../../voidStatements/mongo");
var mongo_9 = require("../../getDownRefId/mongo");
var mongo_10 = require("../../getUpRefIds/mongo");
var mongo_11 = require("../../setQueriables/mongo");
var mongo_12 = require("../../getStatementsByIds/mongo");
var mongo_13 = require("../../getUpRefsByIds/mongo");
var mongo_14 = require("../../updateFullActivities/mongo");
var mongo_15 = require("../../incrementStoreCount/mongo");
var connectToMongoDb_1 = require("../../../utils/connectToMongoDb");
exports.default = (function (factoryConfig) {
    var facadeConfig = (factoryConfig !== undefined
        ? factoryConfig
        : { db: connectToMongoDb_1.default() });
    return {
        clearRepo: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, facadeConfig.db()];
                    case 1: return [4 /*yield*/, (_a.sent()).dropDatabase()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        migrate: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve()];
        }); }); },
        rollback: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, Promise.resolve()];
        }); }); },
        createStatements: mongo_1.default(facadeConfig),
        getFullActivity: mongo_2.default(facadeConfig),
        getHashes: mongo_3.default(facadeConfig),
        getStatement: mongo_4.default(facadeConfig),
        getStatements: mongo_5.default(facadeConfig),
        getVoidersByObjectIds: mongo_6.default(facadeConfig),
        getVoidersByIds: mongo_7.default(facadeConfig),
        voidStatements: mongo_8.default(facadeConfig),
        getDownRefId: mongo_9.default(facadeConfig),
        getUpRefIds: mongo_10.default(facadeConfig),
        setQueriables: mongo_11.default(facadeConfig),
        getStatementsByIds: mongo_12.default(facadeConfig),
        getUpRefsByIds: mongo_13.default(facadeConfig),
        updateFullActivities: mongo_14.default(facadeConfig),
        incrementStoreCount: mongo_15.default(facadeConfig),
    };
});
//# sourceMappingURL=factory.js.map