"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
var express = require("express");
var translatorFactory_1 = require("./translatorFactory");
var serviceFactory_1 = require("./serviceFactory");
var expressPresenter_1 = require("./expressPresenter");
var config_1 = require("./config");
var logger_1 = require("./logger");
var app = express();
var translator = translatorFactory_1.default();
var serviceFacade = serviceFactory_1.default();
var presenterFacade = expressPresenter_1.default({
    llClientInfoEndpoint: config_1.default.llClientInfoEndpoint,
    customRoute: config_1.default.express.customRoute,
    customRouteText: config_1.default.express.customRouteText,
    morganDirectory: config_1.default.express.morganDirectory,
    bodyParserLimit: config_1.default.express.bodyParserLimit,
    service: serviceFacade,
    translator: translator,
    logger: logger_1.default,
});
var handleExit = function (event) {
    return function (error) {
        if (error)
            logger_1.default.error(error.stack);
        logger_1.default.info(event);
        process.exit();
    };
};
app.use(presenterFacade);
app.listen(config_1.default.express.port, function () {
    logger_1.default.info("Listening on port " + config_1.default.express.port);
    if (process.send) {
        logger_1.default.info('Process ready');
        process.send('ready');
    }
    if (process.on) {
        process.on('exit', handleExit('exit'));
        process.on('SIGINT', handleExit('SIGINT'));
        process.on('SIGTERM', handleExit('SIGTERM'));
        process.on('uncaughtException', handleExit('uncaughtException'));
    }
});
//# sourceMappingURL=server.js.map