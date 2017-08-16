"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingIfi = function (actorKey, filterAgent) {
    if (filterAgent.mbox !== undefined) {
        return _a = {}, _a[actorKey + ".mbox"] = filterAgent.mbox, _a;
    }
    if (filterAgent.account !== undefined) {
        return _b = {},
            _b[actorKey + ".account.name"] = filterAgent.account.name,
            _b[actorKey + ".account.homePage"] = filterAgent.account.homePage,
            _b;
    }
    if (filterAgent.openid !== undefined) {
        return _c = {}, _c[actorKey + ".openid"] = filterAgent.openid, _c;
    }
    if (filterAgent.mbox_sha1sum !== undefined) {
        return _d = {}, _d[actorKey + ".mbox_sha1sum"] = filterAgent.mbox_sha1sum, _d;
    }
    /* istanbul ignore next */
    return {};
    var _a, _b, _c, _d;
};
var isMatchingActor = function (actorKey, filterAgent) {
    return {
        $or: [
            isMatchingIfi(actorKey, filterAgent),
            isMatchingIfi(actorKey + ".member", filterAgent)
        ]
    };
};
exports.default = isMatchingActor;
//# sourceMappingURL=isMatchingAgent.js.map