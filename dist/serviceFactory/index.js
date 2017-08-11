"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var repoFactory_1 = require("../repoFactory");
var service_1 = require("../service");
var config_1 = require("../config");
exports.default = function () {
    var repoFacade = repoFactory_1.default();
    return service_1.default(__assign({ repo: repoFacade }, config_1.default.service));
};
//# sourceMappingURL=index.js.map