"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expressPresenter_1 = require("jscommons/dist/expressPresenter");
var getAbout_1 = require("./getAbout");
var getDemoAuth_1 = require("./getDemoAuth");
var getFullActivity_1 = require("./getFullActivity");
var getStatements_1 = require("./getStatements");
var postStatements_1 = require("./postStatements");
var putStatement_1 = require("./putStatement");
exports.default = function (config) {
    var router = expressPresenter_1.default(config);
    router.get('/auth', getDemoAuth_1.default(config));
    router.get('/xAPI/about', getAbout_1.default(config));
    router.get('/xAPI/activities', getFullActivity_1.default(config));
    router.get('/xAPI/statements', getStatements_1.default(config));
    router.put('/xAPI/statements', putStatement_1.default(config));
    router.post('/xAPI/statements', postStatements_1.default(config));
    return router;
};
//# sourceMappingURL=index.js.map