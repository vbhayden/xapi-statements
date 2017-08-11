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
var lodash_1 = require("lodash");
var NoModel_1 = require("jscommons/dist/errors/NoModel");
var MissingLoadedId_1 = require("../../../errors/MissingLoadedId");
var logger_1 = require("../../../logger");
var eagerLoadUpRefs_1 = require("./eagerLoadUpRefs");
var eagerLoadDownRefs_1 = require("./eagerLoadDownRefs");
var shortId = function (id) {
    return id[id.length - 1];
};
var shortIds = function (ids) {
    return "[" + ids.map(shortId).join(',') + "]";
};
var stack = function (value, values) {
    return lodash_1.union([value], values);
};
exports.default = function (config, models) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var groupedUpRefIds, groupedDownRefs, groupedDownRefIds, getDownRefId, getUpRefIds, getDownRefs, setRefs, traverseDown, traverseUp, traverseUpRefs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* istanbul ignore next */
                if (!config.enableReferencing)
                    return [2 /*return*/];
                return [4 /*yield*/, eagerLoadUpRefs_1.default(config, models)];
            case 1:
                groupedUpRefIds = _a.sent();
                return [4 /*yield*/, eagerLoadDownRefs_1.default(config, models)];
            case 2:
                groupedDownRefs = _a.sent();
                groupedDownRefIds = lodash_1.keys(groupedDownRefs);
                if (lodash_1.size(groupedUpRefIds) === 0 && lodash_1.size(groupedDownRefs) === 0)
                    return [2 /*return*/];
                getDownRefId = function (id) {
                    logger_1.default.debug('getDownRefId', shortId(id));
                    return config.repo.getDownRefId({ id: id });
                };
                getUpRefIds = function (id) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (lodash_1.has(groupedUpRefIds, id)) {
                            logger_1.default.silly('getUpRefIds cached', shortId(id));
                            return [2 /*return*/, lodash_1.get(groupedUpRefIds, id, [])];
                        }
                        logger_1.default.debug('getUpRefIds', shortId(id));
                        return [2 /*return*/, config.repo.getUpRefIds({ id: id })];
                    });
                }); };
                getDownRefs = function (targetIds) { return __awaiter(_this, void 0, void 0, function () {
                    var loadedTargetIds, unloadedTargetIds, loadedDownRefs, unloadedDownRefs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                loadedTargetIds = lodash_1.intersection(targetIds, groupedDownRefIds);
                                unloadedTargetIds = lodash_1.difference(targetIds, groupedDownRefIds);
                                loadedDownRefs = loadedTargetIds.map(function (targetId) {
                                    if (lodash_1.has(groupedDownRefs, targetId)) {
                                        return groupedDownRefs[targetId];
                                    }
                                    /* istanbul ignore next */
                                    throw new MissingLoadedId_1.default(targetId);
                                });
                                return [4 /*yield*/, config.repo.getStatementsByIds({
                                        ids: unloadedTargetIds,
                                    })];
                            case 1:
                                unloadedDownRefs = _a.sent();
                                logger_1.default.silly('getDownRefs cached', shortIds(loadedTargetIds));
                                logger_1.default.silly('getDownRefs uncached', shortIds(unloadedTargetIds));
                                return [2 /*return*/, loadedDownRefs.concat(unloadedDownRefs)];
                        }
                    });
                }); };
                setRefs = function (id, givenRefIds) { return __awaiter(_this, void 0, void 0, function () {
                    var refIds, refs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                refIds = lodash_1.pull(givenRefIds, id);
                                return [4 /*yield*/, getDownRefs(refIds)];
                            case 1:
                                refs = _a.sent();
                                logger_1.default.debug('setRefs', shortId(id), shortIds(refIds));
                                return [2 /*return*/, config.repo.setRefs({ id: id, refs: refs })];
                        }
                    });
                }); };
                traverseDown = function (modelId, visitedIds) { return __awaiter(_this, void 0, void 0, function () {
                    var newVisitedIds, downRefId, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.default.silly('traverseDown', shortId(modelId), shortIds(visitedIds));
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                newVisitedIds = stack(modelId, visitedIds);
                                return [4 /*yield*/, getDownRefId(modelId)];
                            case 2:
                                downRefId = _a.sent();
                                return [2 /*return*/, (lodash_1.includes(newVisitedIds, downRefId) ?
                                        traverseUp([], newVisitedIds, downRefId) :
                                        traverseDown(downRefId, newVisitedIds))];
                            case 3:
                                err_1 = _a.sent();
                                if (err_1.constructor === NoModel_1.default) {
                                    return [2 /*return*/, traverseUp([], [], modelId)];
                                }
                                /* istanbul ignore next */
                                throw err_1;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                traverseUp = function (visitedIds, refIds, modelId) { return __awaiter(_this, void 0, void 0, function () {
                    var newVisitedIds, newRefIds, upRefIds;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.default.silly('traverseUp', shortIds(visitedIds), shortIds(refIds), shortId(modelId));
                                if (lodash_1.includes(visitedIds, modelId))
                                    return [2 /*return*/, []];
                                if (!(refIds.length > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setRefs(modelId, refIds)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                newVisitedIds = stack(modelId, visitedIds);
                                newRefIds = stack(modelId, refIds);
                                return [4 /*yield*/, getUpRefIds(modelId)];
                            case 3:
                                upRefIds = _a.sent();
                                return [2 /*return*/, traverseUpRefs(newVisitedIds, newRefIds, upRefIds)];
                        }
                    });
                }); };
                traverseUpRefs = function (visitedIds, refIds, upRefIds) { return __awaiter(_this, void 0, void 0, function () {
                    var traversedIds;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.default.silly('traverseUpRefs', shortIds(visitedIds), shortIds(refIds), shortIds(upRefIds));
                                return [4 /*yield*/, Promise.all(upRefIds.map(function (upRefId) {
                                        return traverseUp(visitedIds, refIds, upRefId);
                                    }))];
                            case 1:
                                traversedIds = _a.sent();
                                return [2 /*return*/, lodash_1.union.apply(void 0, [visitedIds, refIds].concat(traversedIds))];
                        }
                    });
                }); };
                logger_1.default.debug('Updating references for storage');
                return [4 /*yield*/, models.reduce(function (results, model) { return __awaiter(_this, void 0, void 0, function () {
                        var visitedIds, modelId, traversedIds, traversedIds;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, results];
                                case 1:
                                    visitedIds = _a.sent();
                                    modelId = model.statement.id;
                                    logger_1.default.debug('Updating references', shortId(modelId));
                                    if (lodash_1.includes(visitedIds, modelId))
                                        return [2 /*return*/, visitedIds];
                                    if (!(model.statement.object.objectType !== 'StatementRef')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, traverseUp([], [], modelId)];
                                case 2:
                                    traversedIds = _a.sent();
                                    return [2 /*return*/, lodash_1.union(visitedIds, traversedIds)];
                                case 3: return [4 /*yield*/, traverseDown(modelId, [])];
                                case 4:
                                    traversedIds = _a.sent();
                                    return [2 /*return*/, lodash_1.union(visitedIds, traversedIds)];
                            }
                        });
                    }); }, Promise.resolve([]))];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=index.js.map