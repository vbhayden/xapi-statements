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
var repo_1 = require("../repo");
var service_1 = require("../service");
var config_1 = require("../config");
var tracker_1 = require("../tracker");
var logger_1 = require("../logger");
exports.default = (function () {
    return service_1.default(__assign({ repo: repo_1.default,
        tracker: tracker_1.default,
        logger: logger_1.default }, config_1.default.service));
});
//# sourceMappingURL=index.js.map