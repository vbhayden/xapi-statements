"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var MissingAttachments_1 = require("../../errors/MissingAttachments");
var ExtraAttachments_1 = require("../../errors/ExtraAttachments");
var getStatementsAttachments_1 = require("../utils/getStatementsAttachments");
exports.default = (function (config, models, attachments) {
    /* istanbul ignore next */
    if (!config.enableAttachmentValidation)
        return;
    var attachmentHashes = attachments.map(function (attachment) {
        return attachment.hash;
    });
    var statementsAttachments = getStatementsAttachments_1.default(models);
    // Checks for attachments defined in statements but not in the attachments.
    var missingHashes = statementsAttachments.filter(function (attachment) {
        return !lodash_1.includes(attachmentHashes, attachment.sha2) && attachment.fileUrl === undefined;
    }).map(function (attachment) {
        return attachment.sha2;
    });
    if (missingHashes.length > 0) {
        throw new MissingAttachments_1.default(missingHashes);
    }
    // Checks for attachments defined in the attachments but not in the statements.
    var statementHashes = statementsAttachments.map(function (attachment) {
        return attachment.sha2;
    });
    var extraHashes = lodash_1.difference(attachmentHashes, statementHashes);
    if (extraHashes.length > 0) {
        throw new ExtraAttachments_1.default(extraHashes);
    }
});
//# sourceMappingURL=checkAttachments.js.map