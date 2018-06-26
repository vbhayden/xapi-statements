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
var lodash_1 = require("lodash");
var mongodb_1 = require("mongodb");
var matchesFullActivity_1 = require("../utils/mongoModels/matchesFullActivity");
var replaceDotsInStatement_1 = require("../utils/mongoModels/replaceDotsInStatement");
var constants_1 = require("../utils/mongoModels/constants");
var getPatchUpdate = function (patch, parentKeys) {
    return lodash_1.mapKeys(patch, function (_value, key) {
        var parentPath = parentKeys.join('.');
        return parentPath + "." + key;
    });
};
exports.default = (function (config) {
    return function (_a) {
        var client = _a.client, updates = _a.updates;
        return __awaiter(_this, void 0, void 0, function () {
            var collection, lrsId, organisationId, batch;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, config.db()];
                    case 1:
                        collection = (_b.sent()).collection(constants_1.FULL_ACTIVITIES_COLLECTION_NAME);
                        lrsId = new mongodb_1.ObjectID(client.lrs_id);
                        organisationId = new mongodb_1.ObjectID(client.organisation);
                        batch = collection.initializeUnorderedBulkOp();
                        updates.forEach(function (update) {
                            var activityId = update.activityId;
                            var extensions = replaceDotsInStatement_1.replaceDotsInExtensions(/\./g, '&46;')(update.extensions);
                            var mongoQuery = matchesFullActivity_1.default({ activityId: activityId, lrsId: lrsId, organisationId: organisationId });
                            var mongoSet = __assign({}, getPatchUpdate(update.name, ['name']), getPatchUpdate(update.description, ['description']), getPatchUpdate(extensions, ['extensions']), (update.moreInfo !== undefined ? { moreInfo: update.moreInfo } : {}), (update.type !== undefined ? { type: update.type } : {}));
                            if (Object.keys(mongoSet).length === 0) {
                                /* istanbul ignore next */
                                return;
                            }
                            var mongoUpdate = { $set: mongoSet };
                            batch.find(mongoQuery).upsert().updateOne(mongoUpdate);
                        });
                        if (!(updates.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, batch.execute()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
});
//# sourceMappingURL=mongo.js.map