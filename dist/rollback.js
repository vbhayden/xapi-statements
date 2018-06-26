"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
var repo_1 = require("./repo");
var logger_1 = require("./logger");
repo_1.default.rollback().then(function () {
    logger_1.default.info('Completed rollback');
    process.exit();
}).catch(function (err) {
    logger_1.default.error(err);
    process.exit();
});
//# sourceMappingURL=rollback.js.map