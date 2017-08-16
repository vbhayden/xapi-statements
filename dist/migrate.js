"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
var repoFactory_1 = require("./repoFactory");
var logger_1 = require("./logger");
var repoFacade = repoFactory_1.default();
repoFacade.migrate().then(function () {
    logger_1.default.info('Completed migrations');
    process.exit();
}).catch(function (err) {
    logger_1.default.error(err);
    process.exit();
});
//# sourceMappingURL=migrate.js.map