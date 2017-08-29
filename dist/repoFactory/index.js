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
var mongodb_1 = require("mongodb");
var S3 = require("aws-sdk/clients/s3");
var redis = require("redis");
var memoryModelsRepo_1 = require("../memoryModelsRepo");
var mongoModelsRepo_1 = require("../mongoModelsRepo");
var localStorageRepo_1 = require("../localStorageRepo");
var s3StorageRepo_1 = require("../s3StorageRepo");
var testAuthRepo_1 = require("../testAuthRepo");
var mongoAuthRepo_1 = require("../mongoAuthRepo");
var redisEventsRepo_1 = require("../redisEventsRepo");
var testEventsRepo_1 = require("../testEventsRepo");
var fetchAuthRepo_1 = require("../fetchAuthRepo");
var config_1 = require("../config");
/* istanbul ignore next */
var getEventsRepo = function () {
    switch (config_1.default.repoFactory.authRepoName) {
        case 'test':
            return testEventsRepo_1.default();
        default:
        case 'redis':
            return redisEventsRepo_1.default({
                client: redis.createClient({
                    url: config_1.default.redis.url,
                }),
                prefix: config_1.default.redis.prefix,
            });
    }
};
/* istanbul ignore next */
var getAuthRepo = function () {
    switch (config_1.default.repoFactory.authRepoName) {
        case 'test':
            return testAuthRepo_1.default({});
        case 'fetch':
            return fetchAuthRepo_1.default({
                llClientInfoEndpoint: config_1.default.llClientInfoEndpoint,
            });
        default:
        case 'mongo':
            return mongoAuthRepo_1.default({
                db: mongodb_1.MongoClient.connect(config_1.default.mongo.url),
            });
    }
};
/* istanbul ignore next */
var getModelsRepo = function () {
    switch (config_1.default.repoFactory.modelsRepoName) {
        case 'mongo':
            return mongoModelsRepo_1.default({
                db: mongodb_1.MongoClient.connect(config_1.default.mongo.url),
            });
        default:
        case 'memory':
            return memoryModelsRepo_1.default({
                state: { statements: [], fullActivities: [] }
            });
    }
};
/* istanbul ignore next */
var getStorageRepo = function () {
    switch (config_1.default.repoFactory.storageRepoName) {
        case 's3':
            return s3StorageRepo_1.default({
                client: new S3(config_1.default.storage.s3.awsConfig),
                bucketName: config_1.default.storage.s3.bucketName,
                subFolder: config_1.default.storage.s3.subFolder,
            });
        default:
        case 'local':
            return localStorageRepo_1.default(config_1.default.storage.local);
    }
};
exports.default = function () {
    var eventsRepo = getEventsRepo();
    var authRepo = getAuthRepo();
    var modelsRepo = getModelsRepo();
    var storageRepo = getStorageRepo();
    return __assign({}, eventsRepo, authRepo, modelsRepo, storageRepo, { clearRepo: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            eventsRepo.clearRepo(),
                            modelsRepo.clearRepo(),
                            storageRepo.clearRepo(),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, migrate: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            eventsRepo.migrate(),
                            modelsRepo.migrate(),
                            storageRepo.migrate(),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, rollback: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            eventsRepo.rollback(),
                            modelsRepo.rollback(),
                            storageRepo.rollback(),
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); } });
};
//# sourceMappingURL=index.js.map