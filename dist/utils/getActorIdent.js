"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (actor) {
    if (actor.mbox !== undefined) {
        return actor.mbox;
    }
    else if (actor.account !== undefined) {
        return actor.account.homePage + "|" + actor.account.name;
    }
    else if (actor.openid !== undefined) {
        return actor.openid;
    }
    else if (actor.mbox_sha1sum !== undefined) {
        return actor.mbox_sha1sum;
    }
    throw new Error('Expected an identifier');
});
//# sourceMappingURL=getActorIdent.js.map