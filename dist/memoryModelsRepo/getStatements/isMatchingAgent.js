"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var isMatchingIfi = function (actor, filterAgent) {
    if (filterAgent.mbox !== undefined) {
        return filterAgent.mbox === actor.mbox;
    }
    else if (filterAgent.account !== undefined) {
        return (actor.account !== undefined &&
            filterAgent.account.name === actor.account.name &&
            filterAgent.account.homePage === actor.account.homePage);
    }
    else if (filterAgent.openid !== undefined) {
        return filterAgent.openid === actor.openid;
    }
    else if (filterAgent.mbox_sha1sum !== undefined) {
        return filterAgent.mbox_sha1sum === actor.mbox_sha1sum;
    }
    /* istanbul ignore next */
    return false;
};
var isMatchingMembers = function (members, filterAgent) {
    return lodash_1.find(members, function (member) {
        return isMatchingActor(member, filterAgent);
    }) !== undefined;
};
var isMatchingActor = function (actor, filterAgent) {
    return (isMatchingIfi(actor, filterAgent) ||
        (actor.objectType !== 'Group' ||
            actor.member === undefined ? false : isMatchingMembers(actor.member, filterAgent)));
};
exports.default = isMatchingActor;
//# sourceMappingURL=isMatchingAgent.js.map