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
var matchesClientOption_1 = require("../../utils/memoryModels/matchesClientOption");
var matchesAgentOption_1 = require("./matchesAgentOption");
var matchesCursorOption_1 = require("./matchesCursorOption");
var matchesVerbOption_1 = require("./matchesVerbOption");
var matchesActivityOption_1 = require("./matchesActivityOption");
var matchesRegistrationOption_1 = require("./matchesRegistrationOption");
var matchesUntilOption_1 = require("./matchesUntilOption");
var matchesSinceOption_1 = require("./matchesSinceOption");
var filterModels = function (models, opts) {
    return models.filter(function (model) {
        var statement = model.statement;
        return (model.voided === false &&
            matchesCursorOption_1.default(model, opts) &&
            matchesClientOption_1.default(model, opts.client, true) &&
            matchesAgentOption_1.default(model, opts) &&
            matchesVerbOption_1.default(model, opts) &&
            matchesActivityOption_1.default(model, opts) &&
            matchesRegistrationOption_1.default(model, opts) &&
            matchesUntilOption_1.default(statement, opts) &&
            matchesSinceOption_1.default(statement, opts));
    });
};
var sortModels = function (models, ascending) {
    var lower = ascending ? -1 : 1;
    var higher = ascending ? 1 : -1;
    return models.sort(function (modelA, modelB) {
        var storedA = modelA.statement.stored;
        var storedB = modelB.statement.stored;
        if (storedA < storedB)
            return lower;
        /* istanbul ignore next */
        if (storedA > storedB)
            return higher;
        if (modelA._id < modelB._id)
            return lower;
        /* istanbul ignore next */
        if (modelA._id > modelB._id)
            return higher;
        /* istanbul ignore next */
        return 0;
    });
};
var limitModels = function (models, skip, limit) {
    if (skip === void 0) { skip = 0; }
    return models.slice(skip, limit + skip);
};
exports.default = (function (config) {
    return function (opts) { return __awaiter(_this, void 0, void 0, function () {
        var filteredItems, sortedItems, limitedItems;
        return __generator(this, function (_a) {
            filteredItems = filterModels(config.state.statements, opts);
            sortedItems = sortModels(filteredItems, opts.ascending);
            limitedItems = limitModels(sortedItems, opts.skip, opts.limit);
            return [2 /*return*/, limitedItems];
        });
    }); };
});
//# sourceMappingURL=index.js.map