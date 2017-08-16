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
var lodash_1 = require("lodash");
var Conflict_1 = require("../../errors/Conflict");
var DuplicateId_1 = require("../../errors/DuplicateId");
var modelsConflicts = function (models) {
    return models.reduce(function (_a, model) {
        var modelsMap = _a.modelsMap, generatedIdModels = _a.generatedIdModels;
        if (model.hasGeneratedId) {
            // Relies on the DB indexes to ensure that there are no duplicate IDs.
            return {
                modelsMap: modelsMap,
                generatedIdModels: generatedIdModels.concat([
                    model,
                ]),
            };
        }
        ;
        // Ensures that there are no duplicate ids within the batch (spec requirement).
        var statementId = model.statement.id;
        if (lodash_1.has(modelsMap, statementId)) {
            throw new DuplicateId_1.default(statementId);
        }
        return {
            modelsMap: __assign({}, modelsMap, (_b = {}, _b[statementId] = model, _b)),
            generatedIdModels: generatedIdModels,
        };
        var _b;
    }, { modelsMap: {}, generatedIdModels: [] });
};
var repoConflicts = function (config, modelsMap) { return __awaiter(_this, void 0, void 0, function () {
    var hashesMap, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = lodash_1.groupBy;
                return [4 /*yield*/, config.repo.getHashes({
                        ids: lodash_1.keys(modelsMap),
                    })];
            case 1:
                hashesMap = _a.apply(void 0, [_b.sent(), 'statementId']);
                return [2 /*return*/, lodash_1.values(modelsMap).filter(function (model) {
                        var statementId = model.statement.id;
                        if (lodash_1.has(hashesMap, statementId)) {
                            if (model.hash !== hashesMap[statementId][0].hash) {
                                throw new Conflict_1.default(statementId);
                            }
                            return false;
                        }
                        return true;
                    })];
        }
    });
}); };
exports.default = function (config, models) { return __awaiter(_this, void 0, void 0, function () {
    var conflictRes, ungeneratedIdModels;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* istanbul ignore next */
                if (!config.enableConflictChecks)
                    return [2 /*return*/, models];
                conflictRes = modelsConflicts(models);
                return [4 /*yield*/, repoConflicts(config, conflictRes.modelsMap)];
            case 1:
                ungeneratedIdModels = _a.sent();
                return [2 /*return*/, ungeneratedIdModels.concat(conflictRes.generatedIdModels)];
        }
    });
}); };
//# sourceMappingURL=getUnstoredModels.js.map