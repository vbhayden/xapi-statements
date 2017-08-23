"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingRelatedActivity_1 = require("./isMatchingRelatedActivity");
var isMatchingActivity_1 = require("./isMatchingActivity");
var matchesModel_1 = require("./matchesModel");
var matcher = function (statement, opts) {
    return (opts.activity === undefined ? true :
        (opts.related_activities === true ?
            isMatchingRelatedActivity_1.default(statement, opts.activity) :
            (statement.object.objectType === 'Activity' &&
                isMatchingActivity_1.default(statement.object, opts.activity))));
};
exports.default = matchesModel_1.default(matcher);
//# sourceMappingURL=matchesActivityOption.js.map