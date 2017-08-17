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
var btoa = require("btoa");
var config_1 = require("../../config");
var mongodb_1 = require("mongodb");
var mongoAuthRepo_1 = require("../../mongoAuthRepo");
var createClientModel_1 = require("../../tests/utils/createClientModel");
var assert = require("assert");
describe('getClient from mongo client', function () {
    var authConfig = {
        db: mongodb_1.MongoClient.connect(config_1.default.mongo.url)
    };
    var authRepo = mongoAuthRepo_1.default(authConfig);
    var basic_key = '123';
    var basic_secret = 'abc';
    var CLIENT_MODEL = createClientModel_1.default({
        _id: '5988f0f00000000000000123'
    });
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authConfig.db];
                case 1: 
                // Insert client to db
                return [4 /*yield*/, (_a.sent()).collection('client').insert(__assign({}, CLIENT_MODEL, { api: {
                            basic_key: basic_key,
                            basic_secret: basic_secret
                        } }))];
                case 2:
                    // Insert client to db
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a client from the db', function () { return __awaiter(_this, void 0, void 0, function () {
        var b64, authToken, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    b64 = btoa(basic_key + ":" + basic_secret);
                    authToken = "Basic " + b64;
                    return [4 /*yield*/, authRepo.getClient({ authToken: authToken })];
                case 1:
                    result = _a.sent();
                    assert.equal(result.client._id, CLIENT_MODEL._id);
                    return [2 /*return*/];
            }
        });
    }); });
    after(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authConfig.db];
                case 1: 
                // clear client from db
                return [4 /*yield*/, (_a.sent()).collection('client').remove({})];
                case 2:
                    // clear client from db
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getClient.test.js.map