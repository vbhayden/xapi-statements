"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingAgent_1 = require("./isMatchingAgent");
var isMatchingUnrelatedAgent_1 = require("./isMatchingUnrelatedAgent");
var isMatchingRelatedActor = function (statement, filterAgent) {
    return (isMatchingUnrelatedAgent_1.default(statement, filterAgent) ||
        (statement.context === undefined ? false : ((statement.context.team === undefined ? false :
            isMatchingAgent_1.default(statement.context.team, filterAgent)) ||
            (statement.context.instructor === undefined ? false :
                isMatchingAgent_1.default(statement.context.instructor, filterAgent)))) ||
        (statement.object.objectType === 'SubStatement' &&
            isMatchingRelatedActor(statement.object, filterAgent)));
};
exports.default = function (statement, filterAgent) {
    return (isMatchingAgent_1.default(statement.authority, filterAgent) ||
        isMatchingRelatedActor(statement, filterAgent));
};
//# sourceMappingURL=isMatchingRelatedAgent.js.map